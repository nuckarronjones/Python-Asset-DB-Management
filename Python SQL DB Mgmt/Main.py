#############################################################
#FIX: Come back to later. Temporary fix
#DEBUG: remove as soon as possible. Quick testing
#############################################################
from flask import Flask, render_template, request, jsonify
from importlib import reload
import SQLTable
import SQLEditTable
import GetBranchNames

branch = None

app = Flask(__name__)

@app.route('/home')
def result():

    SQLTable.getTable()
    SQLTable.getAllRows()

    #DEBUG: importlib.reload(SQLTable) #reload results if any changes have occured

    return render_template(
    	'home.html',query = SQLTable.results,
    	columns = SQLTable.columnNames, 
    	zip=zip, #zip is used to analyze both column and row names at once
        droplist = GetBranchNames.branches,
        wholeDBArray = SQLTable.allRows)

@app.route('/home',methods=['POST'])#POST REQUEST DROPDOWN MENU #REFRESH COMPLETED BY AJAX
def branchFilter():

    reload(SQLTable)

    branch = request.form['branchname']

    SQLTable.branch = branch

    SQLTable.getTable()

    return ('', 204)
    
@app.route('/edit',methods=['POST'])#POST REQUEST TABLE CHANGE
def takePost():

    SQLEditTable.item = request.form['value'] #retrieved from ajax value
    SQLEditTable.rowid = int(request.form['thisid']) #retrieved from ajax value
    SQLEditTable.column = request.form['column'] #retrieved from ajax value

    print(str(SQLEditTable.item) + " " + str(SQLEditTable.rowid))

    SQLEditTable.changeDB(SQLEditTable.item,SQLEditTable.rowid)

    #importlib.reload(SQLTable) #reload results if any changes have occured

    print("POSTED FIELD CHANGE")

    reload(SQLTable)

    SQLTable.getTable()

    return ('', 204)

@app.route('/deleteRow',methods=['POST'])#DELETE ROW WITH ATTRIBUTE 'HIGHLIGHTED'
def deleteRow():

    SQLTable.deleteRow(request.form['idnum'])

    return ('', 204)