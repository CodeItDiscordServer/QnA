
from flask import Flask,request,render_template
from server.src.SearchPiazza import search_mongo_4_pizza
# from flask.ext.api.parsers import JSONParser
from server.src.Mongo import get_bulk_posts



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
def create_app(testing = False):
    app = Flask(__name__)

    @app.route("/")
    def  react():
        return render_template("index.html")

    @app.route('/api/')
    def GiveGrettings():
        return {"greetings": "you suck big pp"}

    @app.route("/render/posts")
    def RenderPage():
        dump = request.args.get("dump").split(",")
        if(dump):
            posts = []
            for post in get_bulk_posts(dump):
                posts.append(post)
            return render_template("DetailsView.html",posts=posts)
        else:
            return "no dump",400

    @app.route("/api/json-details")
    def fetchJsonDetails():
        dump = request.args.get("dump").split(",")
        if(dump):
            posts = []
            for post in get_bulk_posts(dump):
                # _ids are not serializable and also not needed in the react render of details page.
                del  post["_id"]
                posts.append(post)
            return {"dump": posts},200
        else:
            return "no dump specified",400

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
        filter["Instructor has answered"] = 1 if request.args.get("Instructor has answered") == "true" else 0
        filter["Student has answered"] = 1 if request.args.get("Student has answered") == "true" else 0
        if(len(request.args.get("tags"))):
            filter["tags"] = request.args.get("tags")
            filter["tags"] = filter["tags"].split(",")
        filter["searchText"] = request.args.get("searchText")
        if(request.args.get("skip") != "0"):
            filter["skip"] = request.args.get("skip")


        #####
        return search_mongo_4_pizza(filter),200

    return app
