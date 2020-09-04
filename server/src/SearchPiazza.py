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
######################
# First we create the filter object in the client side,
# creating keys for every filter filled in in the form.
#create a map to classify percentages..
    if(filter['searchText']):
        postDesc["searchText"] = filter["searchText"].split(" ")# split it up in words
        postDesc["searchText"] = set(postDesc["searchText"])
        postDesc["searchText"] = (list(postDesc["searchText"])) #guarentee only unique search filter
        postDesc["searchHits"] = {}
        for word in postDesc["searchText"]:
            postDesc["searchHits"][word] = 0

    for key,value in filter.items():
        if(key == "tags" or key =="searchText"):
            continue #skip this  key, we do not want to set its value to 0
        if(value):
            # these need to be all set to true inside this function to be considered
            #related post.
            postDesc[key] = 0
    for key,value in filter["tags"].items():
        if(value):
            postDesc["tags"][key] = 0
# if a form input wasnt used, then we wont use it in the filter.
##########################################
    #every tag needs to be present.
    for key,value in postDesc["tags"].items():
        if(key in post["folders"]):
            postDesc["tags"][key] = 1

    try:
    # hardest, the text content filter which might be percentage based.
        for word in postDesc["searchText"]:
            if(word in post["history"][0]["content"]):
                postDesc["searchHits"][word]+=1
            if(word in post["history"][0]["subject"]):
                postDesc["searchHits"][word]+=1
    except(KeyError):
        # there was no search search
        pass
#
    #folowup filters
    for followup in post["children"]:
        try:
            for word in postDesc["searchText"]:
                try:
                    if(word in followup["history"][0]["content"]):
                            postDesc["searchHits"][word]+=1
                except(KeyError):
                    if(word in followup["subject"]):
                            postDesc["searchHits"][word]+=1
        except(KeyError):
            pass

        if(filter["Instructor has answered"] and followup['type'] == 'i_answer'):
            postDesc["Instructor has answered"] = 1
        if(filter["Student has answered"] and followup['type'] == 's_answer'):
            postDesc["Student has answered"] = 1

    #and finally the


###########################################
# then i check if each requirmements were filled.
    for key,value in postDesc.items():
        # these need to be all set to true
        if(key=="tags"):
            continue
        if(not value):
            return False
    for key,value in postDesc["tags"].items():
        # these need to be all set to true
        if(not value):
            return False

    try:
        for key,value in postDesc["searchHits"].items():
            if value > 0:
                return postDesc["searchHits"] # return the mapping of search hits
        # if all of them dont show up this post is not needed.
        return False # not a single search text filter was found
    except(KeyError):
        # there is no search text, and this raises key erorr
        return 1



def searchpizza(filter_src):
    cs290 = p.network(credents["classID"])
    posts = cs290.iter_all_posts(limit=10) # no limit
    wants = []

    for post in posts:
        res=filterPost(post,filter_src)
        if(res):
            print(res)
            wants.append(post)
    return wants



__exports__ = {"searchpizza":searchpizza, "credents": credents}
