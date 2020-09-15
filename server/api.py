
from flask import Flask,request
from src.SearchPiazza import search_mongo_4_pizza
# from flask.ext.api.parsers import JSONParser

app = Flask(__name__)

hardcoded={
        "i-answered": 1, #instructor has answered
        "s-answered": 1, #student has answered
        "followup": 0, #has at least 1 followup that is not an answer, more of discussion
        "s-answerUpvoted": 0,
        "i-answerUpvoted": 0,
        "q-Upvoted": 0,
        "limit": 5, # the user would like to only receive this many
        "search": 0
}

@app.route('/api/')
def GiveGrettings():
    return {"greetings": "you suck big pp"}


@app.route("/api/search",methods=["GET"])
def SearchCS290():

    classid = "hardcoded"
    filter = {
     "Instructor has answered":0,
     "Student has answered":0,
     "tags": [],
     "searchText": "",
     "skip":0
    }
    filter["Instructor has answered"] = request.args.get("Instructor has answered")
    filter["Student has answered"] = request.args.get("Student has answered")
    if(len(request.args.get("tags"))):
        filter["tags"] = request.args.get("tags")
        filter["tags"] = filter["tags"].split(",")
    filter["searchText"] = request.args.get("searchText")
    if(request.args.get("skip")):
        filter["skip"] = request.args.get("skip")

    #####
    return { "results": search_mongo_4_pizza(filter) },200
