REM This batch file is for development purposes

START "" "C:\Program Files\Sublime Text 3\sublime_text.exe"
"C:\Users\techsupport\AppData\Local\Programs\Python\Python38-32\python.exe" "C:\Users\techsupport\AppData\Local\Programs\Python\Python38-32\importFlask.py"
cd "C:\Users\techsupport\Desktop\Programming\Python\Projects\Python SQL Connect - backup - working dropdownedit"
SET FLASK_APP=Main.py
SET FLASK_ENV=development
flask run

