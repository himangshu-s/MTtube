# an Youtube clone
# to use import instead of require , we need to add the type:module in the package.json.
# this is module js, the  other one is commonJs
# after that install nodemon for automatic server restart
# after this , the nodemon will restart the server , but we have to tell him na ki restart kro, so in the package.json , in scripts , instead of test , the whole line (since we dnt need test), we write ,
"dev": "nodemon src/index.js"

# now inside src, we neeed some folders like controllers= we write the logic here, db= database connection and all, middlewares= when we want to run soemthung inbetween of request and respond like checking the cookied and all, models= data models, routes, utils = utility like file upload , mails etc etc. 

# DevDependencies in a package.json file are software tools and packages that you only need while building and testing your app. Unlike core dependencies, they are excluded from production deployments to keep your final bundle lightweight

# after installing prettier, make an file .prettierrs

# so there may be problem when connecting to the databses , so ita always better to add it inside try catch block.

# otherwise use promises, the resolve and reject also handles it.
# and also we alwways keep database far away in naotjher system , so it takes time to respond, so always use async await . 

# since the dptenv still uses require syntax from commonjs, so we havae to edit the package.json like this = "dev": "nodemon -r dotenv/config --experimental-json-modulessrc/index.js"

# try...catch and app.on("error") handle different kinds of errors.
try...catch catches errors that occur immediately while the code inside the try block is executing, such as a failed mongoose.connect().
app.on("error") registers an event listener that waits for future "error" events emitted by the application.
After the try block finishes, it cannot catch errors that happen later while the server is running.
app.on("error") (or more commonly server.on("error")) is used to handle runtime errors that occur after the application has started.
In short: try...catch handles execution-time exceptions, while .on("error") listens for runtime error events.

 # now got to npm and download cookie-parser and also cors

# when we need to use a middleware or configurstion settings, we use app.use()

#  A middleware is a function that runs between the client's request and the server's response. It can inspect, modify, or stop the request before it reaches the route handler, or process the response afterward. Middleware is commonly used for authentication, logging, validation, and parsing request data. Multiple middleware functions execute in order using next() to pass control to the next one.

# (err, req, res, next) is the signature of an Express error-handling middleware. Express recognizes it as an error handler because it has 4 parameters (instead of the usual 3).
 # Parameters= err → The error object that was thrown or passed using next(error).
# req → The incoming request object.
# res → The response object used to send a response to the client.
# next → Passes control to the next middleware or error handler (if needed).

# 1. connectDB() errors (Startup Errors)
# These happen once, when your application start
# Possible errors:Wrong MongoDB URI
# Wrong username/password
# Database server is down
# Internet connection issue

# If connectDB() fails, the server may never start.

# 2. asyncHandler errors (Request/Runtime Errors)

# These happen after the server has started, when a client sends a request.
# Possible errors:

# Invalid database query
# User.findById() throws an error
# File upload fails
# Any error while processing that specific request

# The server keeps running; only that request fails and the error is sent to the error-handling middleware.

# Application starts
       │
       ▼
# connectDB()  ← Startup error handled by try...catch
       │
       ▼
# Server starts listening
       │
       ▼
# User sends Request 1
       │
       ▼
# asyncHandler catches request errors
       │
       ▼
# User sends Request 2
       │
       ▼
# asyncHandler catches request errors




# there is a whole class for error messages in node js. the name of the class is Error. go to this link= https://nodejs.org/api/errors.html