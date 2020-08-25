from piazza_api import Piazza
import json

p =Piazza()
credents = ""

with open('config.json') as json_file:
    credents = json.load(json_file)


#without the config loaded in like this, its an io blocking prompt
# i had to read the error and it gave me the expected params, unlike the GITHUB repo. lol.
p.user_login(email=credents["user"],password=credents["pass"])




count =0

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

wants=[]


# uses filter

#somehow the filter needs to be able to check all of them.
# for instance, the filte could require both student and instructor answer or none of them.
def filterPost(post,filter):
    # question filters
    postDesc = {
     "tags": {}
    }
    if(filter["searchText"]):
        postDesc["searchText"] = filter["searchText"].split(" ")# split it up in words
    for key,value in filter.items():
        if(key == "tags"):
            continue
        if(value):
            # these need to be all set to true inside this function
            postDesc[key] = 0
    for key,value in filter["tags"].items():
        if(value):
            # these need to be all set to true inside this function
            postDesc["tags"][key] = 0
# here ^^ i set up the requirements of the filter
##########################################
    # postDesc["limit"] = 1

    #folowup filters
    for followup in post["children"]:
        if(filter["Instructor has answered"] and followup['type'] == 'i_answer'):
            postDesc["Instructor has answered"] = 1
        if(filter["Student has answered"] and followup['type'] == 's_answer'):
            postDesc["Student has answered"] = 1


###########################################
# then i check if each requirmements were filled.
    for key,value in postDesc.items():
        # these need to be all set to true
        if(key=="tags"):
            continue
        if(not value):
            print(key,value)
            return False
    for key,value in postDesc["tags"].items():
        # these need to be all set to true
        if(not value):
            print(key,value)
            return False
    return True




def searchpizza(filter_src):
    cs290 = p.network(credents["classID"])
    posts = cs290.iter_all_posts(limit=20)
    wants = []

    for post in posts:
        if(filterPost(post,filter_src)):
            wants.append(post)
    return wants

exports = {"searchpizza":searchpizza}

__exports__ = exports
