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
db = client.qna.posts

def extractFollowup(followup):
    stuff = {
    "reply": "",
    "followups":[]
    }
    try:
        stuff["reply"] = h.handle(followup["history"][0]["content"])
    except(KeyError):
        stuff["reply"] = h.handle(followup["subject"])

    for followup1 in followup["children"]:
        try:
            stuff["followups"].append(h.handle(followup1["history"][0]["content"]))
        except(KeyError):
            if("no regrade" in followup1["subject"]):
                print(follwup1)
            stuff["followups"].append(h.handle(followup1["subject"]))


    return stuff


def BackupLoginGivenClassID(id,user,password):
    pizza.user_login(email=user,password=password)
    pizzaclass = pizza.network(id)
    posts = pizzaclass.iter_all_posts(limit=None)

    count =0
    temparr = []
    for post in posts:
        temparr.append(post)
        if(count ==5):
            print(temparr[0]['created'])
            result = db.insert_many(temparr)
            temparr = []
            count=0
            time.sleep(90)

            count+=1

def BackupConvert(post,id):
    ourjson = {
      "classid": id,
      "date": "",
      "post": {
        "subject": "",
        "content": "",
      },
      "good-q": 0,
      "i-answer": 0,
      "s-answer": 0,
      "tags": [],
      "replies":[]
    }
    ourjson["date"] = post["created"]

    # try:
    ourjson["post"]["subject"] = h.handle(post["history"][0]["subject"])
    ourjson["post"]["content"] = h.handle(post["history"][0]["content"])
    ourjson["tags"] = post["folders"]
    for followup in post["children"]:
        if(followup["type"]=="i_answer"):
            ourjson["i-answer"]=1
        if(followup["type"]=="s_answer"):
            ourjson["s-answer"]=1
        ourjson["replies"].append(extractFollowup(followup))

    return ourjson



def BackupClassGivenClassID(id):
    pizza.user_login(email=credents["user"],password=credents["pass"])
    pizzaclass = pizza.network(id)
    posts = pizzaclass.iter_all_posts(limit=None)

    count =0
    temparr = []
    for post in posts:
        temparr.append(BackupConvert(post,id))
        if(count ==5):
            print(temparr[0]['created'])
            result = db.insert_many(temparr)
            temparr = []
            count=0
            time.sleep(90)
            count+=1

    return



# 
# postz = []
# raw = db.find()
# for post in raw:
#     postz.append(BackupConvert(post,"k89brrt3pq17do"))
# resu = client.qna["posts-redacted"].insert_many(postz)
# print(resu)
