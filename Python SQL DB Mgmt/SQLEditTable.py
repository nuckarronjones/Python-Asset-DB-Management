##EXCECUTE CHANGES IN DB##
import pyodbc 

conn = pyodbc.connect('Driver={SQL Server};'
                      'server=HOMESERVER;'
                      'Database=AssetDatabase;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()

#none by default until ajax values change it
item = None 
rowid = None 
column = None 

###################################################################
def changeDB(value,rowid):#DEPARTMENT ISNT REGESTERING BECAUSE IT IS A STRING
	cursor.execute("UPDATE AssetDatabase.dbo.Assets SET [{}] = ? WHERE ID = ?".format(column),value,rowid)
	conn.commit()