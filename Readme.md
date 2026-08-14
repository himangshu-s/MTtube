# an Youtube clone
# to use import instead of require , we need to add the type:module in the package.json.
# this is module js, the  other one is commonJs
# In JavaScript, async is a keyword used to declare asynchronous functions, which allow your program to perform long-running tasks—like fetching data from a server or loading a file—without freezing the user interface.When you prefix a function with async, it changes the function's behavior in two fundamental ways: it always returns a Promise, and it unlocks the use of the await keyword inside its body.
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


# aftaer making the data midels of user and video we installs a package mongoose-aggregate 
# after that install jsonwebtoken and bcrypt from npm

# so now we will use some mongoose hooks like 'pre' means we will do something before storing the data , means converting the data into encryption

# In Mongoose, `pre("save")` is a middleware that runs automatically before a document is saved to the database. It is attached to the schema, but inside the middleware, `this` refers to the **current document being saved**, not the schema itself. This allows us to access and modify that specific user's data, such as hashing the password before it is stored. We use a normal function instead of an arrow function because Mongoose binds `this` to the current document, whereas arrow functions do not have their own `this`. The `isModified("password")` method is a built-in Mongoose document method that checks whether the password field has changed, preventing an already hashed password from being hashed again. `bcrypt.hashSync()` is a synchronous method from the `bcrypt` library that converts a plain-text password into a secure hashed password, while `bcrypt.hash()` is its asynchronous version and is used with `await`. The `next()` function tells Mongoose that the current middleware has finished its work and that it can continue to the next middleware or, if none remain, proceed with saving the document to MongoDB.

# after this, install cloudinary and multer . clodnary stores the file in the cloud and multer is the tool using which we upload in the cloudnary.
# what we do here is that- we take the file  with the help of the multer and  then put it in the local server temporarily after that , take the same file and thenm we put it in the cloudnary.+
# fs means file system, we dnt hyave to import this l;ibrbaery like , it comes bydefault with node

# # Complete Flow of File Upload using Multer and Cloudinary

## 1. Why do we need Multer?

When a user uploads a file from the frontend (image, video, PDF, etc.), the browser sends the request as **`multipart/form-data`**.

```text
Frontend
   │
   │ POST /register
   │ multipart/form-data
   ▼
Express Server
```

Express **cannot understand or process file uploads by itself**. It can read JSON (`application/json`) but not files.

Therefore, we use **Multer**, which acts as a middleware that receives the uploaded file, extracts it from the request, and temporarily stores it on the server.

---

# 2. Multer Configuration

```js
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null,"./public/temp")
    },

    filename(req,file,cb){
        cb(null,file.originalname)
    }
})

export const upload = multer({ storage })
```

Here,

### `diskStorage()`

Tells Multer to save files **on disk** instead of RAM.

There are two storage engines:

* Disk Storage → Stores files inside your server.
* Memory Storage → Keeps files inside RAM as a Buffer.

---

## destination(req, file, cb)

This function decides **where the uploaded file should be stored.**

```js
destination(req,file,cb){
    cb(null,"./public/temp")
}
```

Arguments:

* `req` → Express request object.
* `file` → Information about the uploaded file.
* `cb` → Callback function.

`cb(error, destination)`

If everything is fine:

```js
cb(null,"./public/temp")
```

If an error occurs:

```js
cb(new Error("Folder not found"))
```

---

## filename(req,file,cb)

This function decides **what name the uploaded file should have.**

```js
filename(req,file,cb){
    cb(null,file.originalname)
}
```

If the user uploads

```text
profile.jpg
```

then Multer stores

```text
public
   └── temp
         └── profile.jpg
```

In production, we usually generate unique names because two users might upload files with the same name.

Example:

```js
cb(null, Date.now() + "-" + file.originalname)
```

---

# 3. Understanding the Request (`req`)

One important thing to remember is:

> **The `req` inside `destination(req,file,cb)` is the exact same request object that later reaches your controller.**

Initially, the request looks like this:

```text
req
│
├── body
├── params
├── headers
└── (no req.file yet)
```

Notice there is **no `req.file` yet** because Multer is still processing the uploaded file.

---

## What does Multer do?

After saving the file successfully, Multer **adds a new property** to the same request object.

```text
req
│
├── body
├── params
├── headers
└── file
     │
     ├── filename
     ├── originalname
     ├── destination
     ├── mimetype
     └── path
```

So the controller receives the **same request object**, but now it contains:

```js
req.file
```

Example:

```js
{
    filename:"profile.jpg",
    destination:"./public/temp",
    path:"public/temp/profile.jpg",
    originalname:"profile.jpg"
}
```

---

# 4. Complete Multer Flow

```text
Client
   │
   │ uploads profile.jpg
   ▼
Express
   │
   ▼
upload.single("avatar")
   │
   ├── destination()
   ├── filename()
   └── Save file
   │
   ▼
public/temp/profile.jpg
   │
   ▼
req.file.path
```

At this point,

```js
req.file.path
```

contains

```text
public/temp/profile.jpg
```

This path becomes the input for Cloudinary.

---

# 5. Cloudinary

Your upload function:

```js
const response = await cloudinary.uploader.upload(
    localFilePath,
    {
        resource_type:"auto"
    }
)
```

Here,

```js
localFilePath
```

is actually

```js
req.file.path
```

which Multer created.

So,

```text
Multer
      │
      ▼
public/temp/profile.jpg
      │
      ▼
uploadOnCloudinary(localFilePath)
```

Cloudinary opens that file, uploads it to the cloud, and returns:

```js
{
    url:"https://res.cloudinary.com/..."
}
```

---

# 6. Why use `await`?

Uploading a file takes time because the file must travel over the internet.

Without `await`

```js
const response = cloudinary.uploader.upload(...)
```

the next line executes immediately before the upload finishes.

Using

```js
await
```

makes JavaScript wait until Cloudinary finishes uploading.

---

# 7. Why `resource_type: "auto"`?

Cloudinary normally assumes the uploaded file is an image.

With

```js
resource_type:"auto"
```

Cloudinary automatically detects whether it is

* Image
* Video
* PDF
* Audio
* Other supported file types

---

# 8. Why delete the local file?

After uploading,

the file exists in **two places**.

```text
Server
│
└── public/temp/profile.jpg

Cloudinary
│
└── profile.jpg
```

Keeping both copies wastes storage.

So after uploading,

delete

```text
public/temp/profile.jpg
```

using

```js
fs.unlink()
```

or

```js
fs.unlinkSync()
```

If uploading fails, we also delete the temporary file so corrupted or unused files do not accumulate.

---

# 9. Complete Request Flow

```text
User
 │
 │ Uploads image
 ▼
Frontend
 │
 ▼
Express Route
 │
 ▼
upload.single("avatar")
(Multer Middleware)
 │
 ├── Reads multipart/form-data
 ├── Stores file in public/temp
 ├── Creates req.file
 └── Calls next()
 │
 ▼
Controller
 │
 ├── Reads req.file.path
 └── Calls uploadOnCloudinary()
 │
 ▼
Cloudinary
 │
 ├── Uploads file
 ├── Returns public URL
 └── File now lives in Cloudinary
 │
 ▼
Delete local temporary file
 │
 ▼
Save Cloudinary URL in MongoDB
 │
 ▼
Send response to client
```

---

# 10. Relationship Between Multer and Cloudinary

Think of them as two consecutive steps.

```text
Browser
    │
    ▼
Multer
    │
    ├── Receives uploaded file
    ├── Saves temporarily
    └── Creates req.file.path
                │
                ▼
Cloudinary
    │
    ├── Reads req.file.path
    ├── Uploads file to cloud
    ├── Returns URL
    └── Delete local file
```

---

# 11. Key Points to Remember

✅ Express cannot handle file uploads by itself.

✅ Multer handles `multipart/form-data`.

✅ `diskStorage()` stores files temporarily on the server.

✅ `destination()` decides **where** to save the file.

✅ `filename()` decides **what the file should be called**.

✅ The `req` inside `destination(req,file,cb)` is **the same request object** that later reaches your controller.

✅ `req.file` **does not exist initially**. Multer creates it **after** saving the uploaded file.

✅ `req.file.path` is passed to Cloudinary.

✅ Cloudinary uploads the file and returns a permanent URL.

✅ The temporary file should be deleted after upload (or after a failed upload).

✅ Only the Cloudinary URL should be stored in MongoDB, **not** the temporary file path.

# Method	Purpose	Example
GET=	Retrieve data	Get all users
POST=	Create new data	Create a new user
PUT=	Replace/update an entire resource	Update all user details
PATCH=	Partially update a resource	Update only the user's email
DELETE	=Remove a resource	Delete a user
HEAD=	Get headers only (no response body)	Check if a file exists
OPTIONS=	Get supported methods for a resource	Browser CORS preflight request

# if we are exporting default *** , thenin import we will use import ** from 
# if we are exporting like export {}, then we will import {} from "

# multer creats sthe re.files like this= 

{
    avatar: [
        {
            fieldname: "avatar",
            originalname: "photo.jpg",
            path: "./public/temp/photo.jpg"
        }
    ],

    coverImage: [
        {
            fieldname: "coverImage",
            originalname: "cover.jpg",
            path: "./public/temp/cover.jpg"
        }
    ]
}



#  User selects image
       ↓
Frontend sends image
       ↓
Multer receives image
       ↓
Multer saves it temporarily
       ↓
req.files
       ↓
req.files.avatar[0].path
       ↓
Local image path
       ↓
Cloudinary
       ↓
Cloudinary URL
       ↓
MongoDB



# important
Suppose your users collection contains:

USER 1
{
    _id: "AAA",
    username: "himu",
    avatar: "avatar1.jpg",
    coverImage: "cover1.jpg",
    password: "xxx"
}

USER 2
{
    _id: "BBB",
    username: "rahul",
    avatar: "avatar2.jpg",
    coverImage: "cover2.jpg",
    password: "yyy"
}

USER 3
{
    _id: "CCC",
    username: "john",
    avatar: "avatar3.jpg",
    coverImage: "cover3.jpg",
    password: "zzz"
}


Each user/document has ONE _id.

The fields inside that document don't have separate _ids.

Think about _id as the "address" of a document

This is probably the easiest mental model.

                    MongoDB
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     _id: AAA       _id: BBB       _id: CCC
        │              │              │
        ↓              ↓              ↓
   Himangshu         Rahul           John
   username          username       username
   avatar            avatar         avatar
   email             email          email
   coverImage        coverImage     coverImage



   # to test by using postman, first open it and select the http methose , we are now using POST . Then select body and from the drop down menu select the form data if u wanna send fioes too along with the data then select form-data , and if only data , then u can use json and form-data both. 

   # we can do many thungs in postman, forst we can make an collection , first make an folder and then inside that we can add ouyr request GET or POST
   # tyen instead of rewriting the full api loink ever\y time we can make envrionment.for that , fjrst go to the enviro0nment and tyhen make new enviro0nment name server and in value paste the chunkof the loink that will be always same and save it and at the top instead of no9 environment select the MTtube option , now in the collection , instead of the whole api link , we can ise {{ and select the server varibale and then the other chunk of the api

   # postman vid timestamp= chai aur backend , vid no 14 , :28 min

   # we give acessToken to the browser but we dnt save it , but we save refreshToken in the databases.n 

   # this is a nirmal user document= user = {
    _id: "abc123",
    username: "himangshu",
    email: "abc@gmail.com",
    password: "hashedPassword",
    ...
}


# Sure. The simplest way to remember it:

1. After login, backend generates an access token and a refresh token.
2. Access token is short-lived and is used to access protected APIs.
3. When the access token expires, the browser uses the refresh token to request a new access token.
4. Backend verifies the refresh token and, if valid, generates a new access token.
5. The browser uses the new access token for further API requests.
6. Refresh token lasts longer and is mainly used to get new access tokens.
# Yes, the browser has to retain the tokens somehow so they can be used later.

Commonly they are stored as:

1. HTTP-only cookies → browser stores them and automatically sends them with requests. This is a common/safe approach. javascript cant read this
2. localStorage/sessionStorage → JavaScript can store and read them, but this has greater security risks if the site has an XSS vulnerability.