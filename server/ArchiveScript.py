from piazza_api import Piazza
import json

p =Piazza()
credents = ""

with open('config.json') as json_file:
    credents = json.load(json_file)


#without the config loaded in like this, its an io blocking prompt
# i had to read the error and it gave me the expected params, unlike the GITHUB repo. lol.
p.user_login(email=credents["user"],password=credents["pass"])
cs290 = p.network(credents["classID"])
posts = cs290.iter_all_posts(limit=10)
count =0

filter={
        "instructorA": 1,
        "followup": 1,
        "supportedAnswer":1,
        "supportedQuestion":1,
        "limit": 5,
        "search": "server.js"
}



for post in posts:
    ## the current first 5 items are lame instructors notes lol
    ###
    if(count >= 6):
        for key,value in post.items():
            print(key)
        print(post["history"][0]["content"])

        # here i imagine we can do a percentage search where 
        ## we seperate the box into words and test each word, and then show
        # the most relevant first
        # question, active, seen statsprint(post["type"],post["status"],post["config"])
        print("&&noanswer&&")
        print(post["children"])
        print("^^^^CHILDREN^^^^^")
        if(len(post["children"])):
            print("this many chiildren",len(post["children"]))
            print(post["children"][0].type) #i_answer means instructor answer
            print(post["children"][0]['history'])
    count+=1
