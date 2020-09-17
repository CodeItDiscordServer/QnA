from piazza_api import Piazza
import src.Mongo  as Mongo

import json

p =Piazza()
credents = ""

with open('./config.json') as json_file:
    credents = json.load(json_file)


#without the config loaded in like this, its an io blocking prompt
# i had to read the error and it gave me the expected params, unlike the GITHUB repo. lol.
p.user_login(email=credents["user"],password=credents["pass"])


wants=[]



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
            postDesc["searchHits"][word] = []

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
                postDesc["searchHits"][word].append(getShortLists(post["history"][0]["content"],word))
            if(word in post["history"][0]["subject"]):
                postDesc["searchHits"][word].append(getShortLists(post["history"][0]["subject"],word))
    except(KeyError):
        # there was no search search
        print("no hitory?",post)
        pass
#
    #folowup filters
    for followup in post["children"]:
        try:
            for word in postDesc["searchText"]:
                # if the post was never edited its just as "subject"
                try:
                    if(word in followup["history"][0]["content"]):
                            postDesc["searchHits"][word].append(getShortLists(followup["history"][0]["content"],word))
                except(KeyError):
                    if(word in followup["subject"]):
                            postDesc["searchHits"][word].append(getShortLists(followup["subject"],word))
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
            if len(value):
                return postDesc["searchHits"] # return the mapping of search hits
        # if all of them dont show up this post is not needed.
        return False # not a single search text filter was found
    except(KeyError):
        # there is no search text, and this raises key erorr
        return 1


#####
# This creates short summarys of a large paragraph of text, focusing on
# little bits surrounding the search terms,  good for skimming.
#####
def getShortLists(text,searchTerm):
    RELEVANCE = 50
    text = text.lower()
    textlen=  len(text)
    searchTerm = searchTerm.lower()
    summaries=[]
    while(1):

        try:
            spot = text.index(searchTerm)
            # have to make sure we returned a split string of correct dimensions
            summaries.append(text[max(0,spot-RELEVANCE):min(textlen,spot+RELEVANCE+len(searchTerm))])
            #basicall means    text[little bit to the left: little bit to the right]
            #  and does this for all instances of the search term in the text


            #VERY IMPORTANT, update the text cursor object
            text = text[min(spot+len(searchTerm)+RELEVANCE,textlen):]
        except(ValueError):
             break

    return summaries



# does not stride through a reply to a reply,
#only searches the questino, the answers and the followups
def textFilter(array,filter):
    refined = []
    for doc in array:
        hits = {}
        for word in filter["searchText"]:
            hits[word] = []
            #search the subject
            if(word in doc["post"]["subject"]):
                hits[word].append(doc["post"]["subject"])

            #search the question
            if(word in doc["post"]["content"]):
                hits[word].append(getShortLists(doc["post"]["content"],word))
            ### now to search the replies
            for reply in doc["replies"]:
                if(word in reply["reply"]):
                    hits[word].append(getShortLists(reply["reply"],word))
        print(hits)
        ##if any of the hits have a length...
        for word in filter["searchText"]:
            if(len(hits[word])):
                doc["summariez"] = hits
                refined.append(doc)
                break
        #######
    #######################
    return refined


def search_mongo_4_pizza(filter_src):
    raw_results = Mongo.queryMongoWithFilter(filter_src)
    if(len(filter_src["searchText"])):
        filter_src["searchHits"] = {}
        filter_src["searchText"] = filter_src["searchText"].split(" ")
        ##################
        return textFilter(raw_results,filter_src)
    else:
        return raw_results

__exports__ = {"searchpizza":search_mongo_4_pizza, "credents": credents}
