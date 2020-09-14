from piazza_api import Piazza
from pymongo import MongoClient
import json
import  html2text
import time

with open('./config.json') as json_file:
    credents = json.load(json_file)




h = html2text.HTML2Text()
h.ignore_links = False


pizza = Piazza()
client = MongoClient(credents["mongouri"])
db = client.qna["posts-redacted"]





  # var goodanswer = 0;
  # for(var i=0;i<Math.min(2,topic.children.length);i++){
  #   if(topic.children[i].tag_endorse_arr && topic.children[i].tag_endorse_arr.length){
  #     goodanswer+=topic.children[i].tag_endorse_arr.length;
  #   }
  # }
def BackupConvert(post,id):
    ourjson = {
      "classid": id,
      "date": "",
      "post": {
        "subject": "",
        "content": "",
      },
      "good-q": 0,
      "good-a": 0,
      "i-answer": 0,
      "s-answer": 0,
      "tags": [],
      "replies":[]
    }
    ourjson["date"] = post["created"]

    # i think there is always a history object here.
    ourjson["post"]["subject"] = h.handle(post["history"][0]["subject"])
    ourjson["post"]["content"] = h.handle(post["history"][0]["content"])

    try:
        ourjson["good-q"] = len(post["tag_good_arr"])
    except(KeyError):
        ourjson["good-q"] = 0

    ourjson["tags"] = post["folders"]
    for followup in post["children"]:
        # we wont know the details but we will know that this post has a lot of supported answers
        # by the numbers.
        try:
            ourjson["good-a"] = ourjson["good-a"] + len(followup["tag_endorse_arr"])
        except(KeyError):
            pass

        if(followup["type"]=="i_answer"):
            ourjson["i-answer"]=1
        if(followup["type"]=="s_answer"):
            ourjson["s-answer"]=1
        ourjson["replies"].append(extractFollowup(followup))

    return ourjson




## This is a recurisve functin i think sinc followups can have replies and those can have replies.

#maybe we just only do one deep and store the rest as json.
def extractFollowup(followup):
    stuff = {
    "reply": "",
    "followups":[]
    }
    try:
        stuff["reply"] = h.handle(followup["history"][0]["content"])
    except(KeyError):
        stuff["reply"] = h.handle(followup["subject"])
    try:
        for nestedF in followup["children"]:
            #recursive call
            stuff["followups"].append(extractFollowup(nestedF))
    except(KeyError):
        pass

    return stuff

def BackupLoginGivenClassID(id,user,password):
    pizza.user_login(email=user,password=password)
    pizzaclass = pizza.network(id)
    posts = pizzaclass.iter_all_posts(limit=None)

    count =0
    for post in posts:
        # result = db.insert_one(BackupConvert(post,id)).inserted_id
        # BackupConvert(post,id)
        count = count +1
        print(count)
        # reset the counter
        time.sleep(1.5)

    return


def BackupClassGivenClassID(id):
    pizza.user_login(email=credents["user"],password=credents["pass"])
    pizzaclass = pizza.network(id)
    posts = pizzaclass.iter_all_posts(limit=None)
    count = 0

    for post in posts:
        # result = db.insert_one(BackupConvert(post,id)).inserted_id
        count = count +1
        print(count)
        # reset the counter
        time.sleep(1.5)

    return


#
# # this was for a quick backup since we already had the posts db
# raw = db.find()
# need to do it one by one to ensure the inserted id is proper.
# for post in raw:
#     print(client.qna["posts-redacted"].insert_one(BackupConvert(post,"k89brrt3pq17do")).inserted_id)
#     time.sleep(1.5)
__exports__ = {"db": db}
