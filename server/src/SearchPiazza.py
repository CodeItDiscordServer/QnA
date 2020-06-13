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
    postDesc = {}
    for key,value in filter.items():
        if(value):
            # these need to be all set to true inside this function
            postDesc[key] = 0
# here ^^ i set up the requirements of the filter
##########################################
    postDesc["limit"] = 1

    #folowup filters
    for fallup in post["children"]:
        if(filter["i-answered"] and fallup['type'] == 'i_answer'):
            postDesc["i-answered"] = 1
        if(filter["s-answered"] and fallup['type'] == 's_answer'):
            postDesc["s-answered"] = 1

###########################################
# then i check if each requirmements were filled.
    for key,value in postDesc.items():
        # these need to be all set to true
        if(not value):
            print(key,value)
            return 0
    return True




def searchpizza(filter_src):
    cs290 = p.network(credents["classID"])
    posts = cs290.iter_all_posts(limit=15)
    wants = []
    for post in posts:
        if(filterPost(post,hardcoded)):
            wants.append(post)
            print("appended")

    return wants

exports = {"searchpizza":searchpizza}

__exports__ = exports


    ## all this other crap is scratch
#### end for loop



    ## the current first 5 items are lame instructors notes lol
    ###
        #print(post["history"][0]["content"])
        # here i imagine we can do a percentage search where 
        ## we seperate the box into words and test each word, and then show
        # the most relevant first
        # question, active, seen statsprint(post["type"],post["status"],post["config"])
        #print(post["children"])
    #print("/ **** CHILDREN ****/")
    #for resp in post["children"]
       # print("type of child?",resp['type'])
        #print("i_answer == type?",resp['type'],resp['type']=='i_answer')
        #if(resp['type'] == 'i_answer'):
         #   print('append post')
         #   break

        #print(post["children"][0]['type']) #i_answer means instructor answer
        ##print(post["children"][0]['subject'])









