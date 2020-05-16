##RESULTS DISPLAYED ON HOME SCREEN##

import pyodbc 
###################################################################
results = []
columnNames =['ID', #hardcoded column names. FIX
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

def getTable(branch = 'NAS'):
  conn = pyodbc.connect('Driver={SQL Server};'
                      'server=HOMESERVER;'
                      'Database=AssetDatabase;'
                      'Trusted_Connection=yes;')

  cursor = conn.cursor()

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

  #columnNames = [column[0] for column in cursor.description] #get names of columns to add in webapp

  for row in cursor:
      results.append(list(row)) #convert tuple result into an array

