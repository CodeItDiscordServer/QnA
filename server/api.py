
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


@app.route("/api/search",methods=["GET","POST"])
def SearchCS290():
    the_filter = {}
    classid = "hardcoded"

    # i dont understand why this is empty/
    print(request.args)

    for key,value in hardcoded.items():
        #parse the request with the hardcoded set of possible filters
        if(request.json and request.json.get(key)):
            print(request.json.get(key))
            # the_filter[key] = request.args.get(key)
        elif(request.form and request.form.get(key)):
            print(request.form.get(key))
    #####
    print(the_filter)
    return { "results": searchpizza(the_filter) },200
