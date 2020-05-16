import pyodbc 
conn = pyodbc.connect('Driver={SQL Server};'
                      'server=HOMESERVER;'
                      'Database=AssetDatabase;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM AssetDatabase.dbo.Assets')

for row in cursor:
    print(row)

input("press any key to leave")
