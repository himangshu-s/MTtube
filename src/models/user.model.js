import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
          fullname:{
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
} , {timestamps: true})
// so here in the pre hook call back dnt use the arrow function , cuz in arrow function  we dnt have the access to this keyword. so if we dnt know the context , how will we manipulate the priperties. 
userSchema.pre("save", function(){})



export const User= mongoose.model("User", async function (next){
    if(this.isModified("password")) return next();
    this.password=bcrypt.hashSync(this.password, 10)
    next()

})