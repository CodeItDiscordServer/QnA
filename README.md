### How to clone and install packages:

To install the client directory, you download the javascript packages from npm. From the root
of the github repo were pwd= `.../QnA/` use this shell script:
```sh
cd client
npm install
```
to run the server

```bash
npx react-scripts start # thats the underlying package that does it, npx lets you reference things in nodemodules
npm start # you could use the built in package.json script
```

to install the server directory, you use pip to install the LOCAL packages. 
we use a virutal env to create a node_modules like folder, instead of downloading
globally.

```bash
cd server
python3 -m venv venv # creates the folder where the packages are stored
. venv/bin/activate # sources you shell enviroment
pip install flask python-dotenv piazza-api # we need these 3 packages.
```

then you are ready to run it, the server is located in ~/server

```sh
flask run
```

=======


## Technologies:
Flask web server allows easy access to piazza, as well as python modules.
reactjs web client

MongoDB?

## features

Search Tool - browse discussions by classname according to the filter

link sharing - reference specific discussion and replies from this tool on  active piazza class
