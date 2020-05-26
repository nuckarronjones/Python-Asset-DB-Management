##RESULTS DISPLAYED ON HOME SCREEN##

import pyodbc 
###################################################################
conn = pyodbc.connect('Driver={SQL Server};'
                      'server=HOMESERVER;'
                      'Database=AssetDatabase;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

results = []
columnNames =['ID', #hardcoded column names. FIX. Needs to be dynamic #columnNames = [column[0] for column in cursor.description] #get names of columns to add in webapp
  'Department',
  'IP Address',
  'Category',
  'Service Tag',
  'PTTY',
  'Location',
  'Notes',
  'Retired Date',
  'Warranty End Date',
  'PR',
  'Manufacturer',
  'Model',
  'Acquired Date',
  'Asset ID',
  'LastLocUpdate']

branch = '9mile 1st'

def getTable():

  branchFilter = "WHERE Location LIKE '{}'".format(branch)

   #go back and add ID
  command = """SELECT 
  	[ID],[Department]
        ,[IP Address]
        ,[Category]
        ,[Service Tag]
        ,[PTTY]
        ,[Location]
        ,[Notes]
        ,[Retired Date]
        ,[Warranty End Date]
        ,[PR]
        ,[Manufacturer]
        ,[Model]
        ,[Acquired Date]
        ,[Asset ID]
        ,[LastLocUpdate]
    FROM [AssetDatabase].[dbo].[Assets] {}""".format(branchFilter)


  cursor.execute(command)

  del results[:]#deletes pervious array values. ensures to avoid duplicates

  #columnNames = [column[0] for column in cursor.description] #get names of columns to add in webapp

  for row in cursor:
      results.append(list(row)) #convert tuple result into an array

  cursor.commit()

def deleteRow(idnumber):
  command = """DELETE FROM [AssetDatabase].[dbo].[Assets] WHERE ID={};""".format(idnumber)
  cursor.execute(command)
  cursor.commit()

  print('ROW WITH ID NUMBER ' + idnumber + " HAS BEEN DELETED")