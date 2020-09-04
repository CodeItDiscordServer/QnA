import time
from piazza_api import Piazza
from SearchPiazza import credents
from pymongo import MongoClient
import json



pizza = Piazza()
client = MongoClient(credents["mongouri"])
db = client.qna.posts
BackupLoginGivenClassID = ""

def BackupLoginGivenClassID(id,user,pass):
    pizza.user_login(email=user,password=pass)
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

    return

def BackupClassGivenClassID(id):
    pizza.user_login(email=credents["user"],password=credents["pass"])
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

    return
