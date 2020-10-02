from piazza_api import Piazza
from pymongo import MongoClient
from bson.objectid import ObjectId

import json
import time

from bs4 import BeautifulSoup

with open('./config.json') as json_file:
    credents = json.load(json_file)




pizza = Piazza()
client = MongoClient(credents["mongouri"])
db = client.qna["posts-redacted"]


# uses filter
def queryMongoWithFilter(filter):
    LIMIT = 15 # per page
    # if there is search text then we must filter them  manually here and cant do
    #mongo query for that althoguht we can filter some.
    query = { "$and": [] } #init the query object, it will always be and, it is easier this way
    if(filter["Instructor has answered"]):
        query["$and"].append( {
            "i-answer": {"$eq": 1}
        })
    if(filter["Student has answered"]):
        query["$and"].append( {
            "s-answer": {"$eq": 1}
        })

    if(len(filter["tags"])):
        query["$and"].append({
            "tags": {"$all": filter["tags"] }
        })

    if(filter["skip"]):
        query["$and"].append({
            "_id": {"$gt": ObjectId(filter["skip"]) }
        })
    if(len(query["$and"]) == 0):
        query = {}


    initial= []
    print(query)
    for post in db.find(query).limit(LIMIT):
        post['id'] = ""+str(post['_id'])
        post.pop("_id")
        initial.append(post)
    # if there is search text then there will be additional filtering
    return initial


def ConverterBeautifulSoup(post,id):

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
    contentForFirstPost = post["history"][0]["content"]
    contentForPostSubject = post["history"][0]["subject"]
    soup = BeautifulSoup(contentForFirstPost, 'html.parser')
    soup1 = BeautifulSoup(contentForPostSubject, 'html.parser')



    ourjson["post"]["content"] = soup.get_text()
    ourjson["post"]["subject"] = soup1.get_text()


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
        soup = BeautifulSoup(followup["history"][0]["content"], 'html.parser')
    except(KeyError):
        soup = BeautifulSoup(followup["subject"], 'html.parser')

    stuff["reply"] = soup.get_text()

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

    for post in client.qna["posts"].find():
        result = db.insert_one(ConverterBeautifulSoup(post,id)).inserted_id
        # p = ConverterBeautifulSoup(post,id)
        print(result)
        # count = count +1
        # print(count)
        # reset the counter
        time.sleep(1.5)

    return
# BackupClassGivenClassID("k89brrt3pq17do")


#
# # this was for a quick backup since we already had the posts db
# raw = db.find()
# need to do it one by one to ensure the inserted id is proper.
# for post in raw:
#     print(client.qna["posts-redacted"].insert_one(BackupConvert(post,"k89brrt3pq17do")).inserted_id)
#     time.sleep(1.5)
__exports__ = {"db": db}
