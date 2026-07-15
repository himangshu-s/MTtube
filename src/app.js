import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app= express()


// now we will use middleware
 app.use(cors({
    origin : process.env.CORS_ORIGIN  , // means it wwill only aloow those origines that are configured in CORS_ORIGIN
credentials: true

 }))

 // means the backend weill accpet data in json and the size is 16kb
 app.use(express.json({limit: "16kb"}))
 // now the backend will accept data from url; too.
//  app.use(express.urlencoded()) 
//  well thuis will wrk tyoo , but if we wanna do more 
app.use(express.urlencoded({extended: true, limit:"16kb"})) // means object isndie the object.

app.use(express.static("public")) // there may be some pdfs or other files which we want to keep in or backend, so it will store this in the public. 


app.use(cookieParser())  // to set up and accept browser cookies.

// now ccokie-parser
app.use(cookieParser)





export default app;