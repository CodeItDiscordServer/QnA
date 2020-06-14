
from flask import Flask,request
from src.SearchPiazza import searchpizza
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


@app.route("/api/search")
def SearchCS290():
    the_filter = {}
    classid = "hardcoded"
    print('hello')
    for key,value in hardcoded.items():
        #parse the request with the hardcoded set of possible filters
        if(request.args.get(key)):
            the_filter[key] = request.args.get(key)
    #####
    return { "results": searchpizza(the_filter) }
