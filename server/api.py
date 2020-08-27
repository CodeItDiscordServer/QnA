
from flask import Flask,request
from src.SearchPiazza import searchpizza
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


@app.route("/api/search",methods=["GET","POST"])
def SearchCS290():
    if(request.is_json):
        the_filter = request.get_json()
    else:
        return { "code": "Invlaid MIME type"},400

    classid = "hardcoded"
    return { "results": searchpizza(the_filter) },200
