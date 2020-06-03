from piazza_api import Piazza

CLASS_ID="k89brrt3pq17do"

p =Piazza()

# this is a I/O blocking
p.user_login()
cs290 = p.network(CLASS_ID)
posts = cs290.iter_all_posts(limit=1)
count =0
for post in posts:
    if(count>1):
        break
    for key,value in post.items():
        print(key)
    print(post["change_log"])
    print("^^^^change_log^^^^^")
    print(post["history"])
    print("^^^^history^^^^^")
    print(post["data"])
    print("^^^^data^^^^^")
    print(post["children"])
    print("^^^^CHILDREN^^^^^")


    count+=1
