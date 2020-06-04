
from flask import Flask

app = Flask(__name__)


@app.route('/api/hello')
def GiveGrettings():
    return {"greetings": "you suck big pp"}
