## Creating a todo backend

schema

userSchema = {
'username' : "xyz",
'email' : "xyz@gmail.com",
'password' : 'xyz123'
}

todoSchema = {
'userid' : 'ref_user',
'title' : 'todo'
'isdone' : boolean,
'desc' : 'string'
'createDate' : 'date.now()'
}

routes :

signin - post
signup - post
addTodo - post
updateTodo - put
deleteTodo - delete

middleware :

Authenticate
