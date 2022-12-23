from flask import Flask, request

app = Flask(__name__)

@app.route('/hello')
def index():
    args = request.args
    if args and args['key'] != 'value':
        return 'Hello ' + str(args['key'])
    return 'Hello World'

@app.route('/reflect', methods=['POST'])
def reflect():
    return "Hello " + str(request.data)

@app.route('/reflect/plex', methods=['POST'])
def reflect_plex():
    ret = {}
    print(request.json)
    for x in request.json:
        tempkey = x
        tempval = request.json[x]
        if type(tempkey) == str:
            tempkey = 'plex_' + tempkey
        if type(tempval) == str:
            tempval = 'plex_' + tempval
        ret[tempkey] = tempval
    # for key, value in request.json:
    #     ret["plex_" + str(key)] = value
    return ret

@app.route('/reflect/plex/form', methods=['POST'])
def reflect_form():
    ret = {}
    for x in request.form:
        ret['plex_'+x] = 'plex_'+request.form[x]
    return ret

@app.route('/login', methods=['POST', 'GET'])
def login():
    valid_dict = {'leo', 'hi', 'plex', 'pog'}
    if request.form['username'] in valid_dict:
        return "Welcome"
    return "Go away"

@app.route('/hello-json')
def json_route():
    return {"text": "Hello World from Dictionary"}

@app.route('/hello-html')
def html_route():
    return "<h1>Hello World</h1><p>Subtext</p>"

@app.route('/hello-html-error')
def error_route():
    return "<h1>Hello World</h1><p>Subtext</p>"

app.run(host="0.0.0.0", port=81)
