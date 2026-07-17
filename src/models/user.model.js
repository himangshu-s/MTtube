import mongoose , {Schema} from "mongoose";
const userSchema= new Schema ({

    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // it makes the database searchable very optimisely.
    },
      email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      
    },
          fullName:{
        type: String,
        required: true,
        index: true,
    
        trim: true,
      
    },
          avatar:{
        type: String,  // so we will store the avatar image at 3 rd party service like cloudanary and this guives us only the url, so its string.

        required: true,
      
    }, 
          coverImage:{
        type: String,
  
    },

    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"

    }, 
    password: {
        type: String,
        required: [true, 'password is required    ']

    },
    refreshToken: {
        type: String
    }
} , {timestamps= true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password= bcrypt.hashSync(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect= async function (password){
    return await bcrypt.compare(password, this.password)
}
// so the methods in mongoose , e can inject a method into the schema. means  , if isPAsswordCorrect doesn't exits, it will be available after this injection by.methods just like .save()

// here password is the password the user is passing and the this.passowrd is user.passowrd which is hashed. 

userSchema.methods.generateAccessToken= function(){

    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullName
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
        return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullName
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export const User= mongoose.model("User", userSchema)



/*
In Mongoose, `pre("save")` is a middleware that runs automatically before a document is saved to the database. It is attached to the schema, but inside the middleware, `this` refers to the **current document being saved**, not the schema itself. This allows us to access and modify that specific user's data, such as hashing the password before it is stored. We use a normal function instead of an arrow function because Mongoose binds `this` to the current document, whereas arrow functions do not have their own `this`. The `isModified("password")` method is a built-in Mongoose document method that checks whether the password field has changed, preventing an already hashed password from being hashed again. `bcrypt.hashSync()` is a synchronous method from the `bcrypt` library that converts a plain-text password into a secure hashed password, while `bcrypt.hash()` is its asynchronous version and is used with `await`. The `next()` function tells Mongoose that the current middleware has finished its work and that it can continue to the next middleware or, if none remain, proceed with saving the document to MongoDB.
*/