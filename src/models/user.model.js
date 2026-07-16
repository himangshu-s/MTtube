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
} , {timestamps= true})



export const User= mongoose.model("User", userSchema)