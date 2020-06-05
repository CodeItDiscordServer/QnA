###Piazza QnA web application

Posts on piazza are unable to be retrieved and used after the semester is over to new students.And most students wish to unsubscribe from the piazza class after the term is over. It is hard to reuse posts.

In this application the python server updates and archives a class into its database, and through the web application one can find answers to their solution, these are read only, and can only be mentioned in a future piazza post for the current class.




mostly will use the readme for the design document but after awhile it will be here and then printed to a pdf
https://docs.google.com/document/d/1g0hEmgi6frJIARm_JjIooGh40dn9g_CjF93rX505Y8s/edit?usp=sharing



### setting up the dot ev,
the venv is in the gitignore for obvious reasons. its repeated code.


```bash
python3 -m venv venv
. venv/bin/activate
pip install flask python-dotenv
```

then you are ready to run it, the server is located in ~/server

```bash
cd server
flask run
```

## Specific Uses
Piazza already exists and is great, new classes will create new piazza page. But old classes students like to move on and not get emails about inactive classes sometimes. Anyways using this piazza archive students can easily search old posts and REFERENCE them to their currently enrolled piazza class.

## Technologies:
Flask web server allows easy access to piazza, as well as python modules.
reactjs web client

MongoDB?

## features

Search Tool - browse discussions by classname according to the filter

link sharing - reference specific discussion and replies from this tool on  active piazza class
