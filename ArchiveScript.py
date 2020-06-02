from piazza_api import Piazza

CLASS_ID="k89brrt3pq17do"

p =Piazza()
p.user_login()
cs290 = p.network(CLASS_ID)
posts = cs290.iter_all_posts(limit=1)
for post in posts:
    print(post)
