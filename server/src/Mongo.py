import time
from piazza_api import Piazza
from SearchPiazza import credents
from pymongo import MongoClient


pizza = Piazza()
pizza.user_login(email=credents["user"],password=credents["pass"])



def backup(classid):
    count =0
    client = MongoClient(credents["mongouri"])
    cs290 = pizza.network(credents["classID"])
    db = client.qna
    print(db)

    # while(1):
    #     post = cs290.iter_all_posts(limit=5)
    #
    #
    #     time.sleep(120)
    #     print("Processed "+count+" piazza post objects")

    return

backup(credents["classID"])
