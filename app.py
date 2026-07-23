from flask import Flask, jsonify, render_template, request, redirect
import mysql.connector

class User:

    def __init__(self, id=0, username=""):
        self.__id = id
        self.__username = username

    def get_username(self):
        return self.__username
    def set_username(self, username):
        self.__username = username

    def get_id(self):
        return self.__id
    def set_id(self, id):
        self.__id = id

app = Flask(__name__)
con = mysql.connector.connect(
    host = 'localhost',
    user = 'nickname',
    password = 'Mouad12345',
    database = 'todo_app'
)
user = User()
permiToDB = False

@app.route("/")
def home():
    return render_template("login_page.html")

@app.route('/signin', methods=['POST', 'GET'])
def signin():
    cursor = con.cursor()
    data = request.get_json()
    
    name = data["name"]
    password = data["password"]

    cursor.execute("select username from users where username = %s", (name,))
    res = cursor.fetchone()

    if res:
        return jsonify({"msg": "user name already used!!"})
    
    cursor.execute("insert into users (username, password) value(%s, %s)", (name, password))
    con.commit()
    cursor.close()

    return jsonify({"msg": "acount created"})

@app.route('/login', methods=['POST', 'GET'])
def login():
    global permiToDB
    cursor = con.cursor()
    data = request.get_json()
    
    name = data["name"]
    password = data["password"]

    cursor.execute("select id,password from users where username = %s", (name,))
    res = cursor.fetchall()

    if res:
        basePass = res[0][1]
        userId = res[0][0]

        if password == basePass:

            user.set_username(name)
            user.set_id(userId)

            permiToDB = True
            return jsonify({
                "msg": "you loged in!",
                "redirect": "/home_page"
            })
        else:
            permiToDB = False
            return jsonify({  "msg": "incorect password!!" })

    cursor.close()
    permiToDB = False
    return jsonify({"msg": "no shuch username!! sign in first."})

@app.route('/stayGuest')
def stayGuest():
    global permiToDB
    permiToDB = False

    return jsonify({
        "msg": "entring as a guest...",
        "redirect": "/home_page"
    })

@app.route('/home_page')
def home_page():
    return render_template("home_page.html")

@app.route('/get_permission')
def get_permission():
    return jsonify({"permission": permiToDB}),200

@app.route('/insertToDB', methods=['POST', 'GET'])
def insertToDB():
    cursor = con.cursor()
    data = request.get_json()

    cursor.execute(f"delete from tasks where user_id = {user.get_id()}")

    insertCode = f"""
        insert into tasks 
        (id, task, completed, category, deadline, user_id)
        value(%s, %s, %s, %s, %s, %s)
    """
    
    for task in data:
        cursor.execute(insertCode, (
            task["id"], 
            task["text"], 
            task["completed"], 
            task["category"], 
            task["deadline"],
            user.get_id()
        ))
    con.commit()
    cursor.close()

    return jsonify({"msg": "insertion established!!"})

@app.route('/loadFromDB', methods=['GET'])
def loadFromDB():
    cursor = con.cursor()
    cursor.execute(
        "select * from tasks where user_id = %s",
        (user.get_id(),)
    )
    rows = cursor.fetchall()
    con.commit()
    cursor.close()

    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "text": row[1],
            "completed": bool(row[2]),
            "category": row[3],
            "deadline": row[4]
        })

    return jsonify(tasks)

@app.route('/getBack')
def getBack():
    return jsonify({
        "msg": "going back to log page...",
        "redirect": "/"
    })

if __name__ == "__main__":
    print("conection established")
    app.run(debug=True)
    