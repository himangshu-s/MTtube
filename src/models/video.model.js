import mongoose, {Schema}  from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema= new Schema({

    videofile:{
        type: String, // cloudnary url
        required: true
    },
    
    thumbnail:{
        type: String, // cloudnary url
        required: true
    }, 
    title:{
        type: String, // cloudnary url
        required: true
    },
     
    description:{
        type: String, // cloudnary url
        required: true
    },
    
    duration:{
        type: Number, // cloudnary gives duration bdw, wehn we upload the video at the cloudnary , it gives the duyration ofnthe video
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean, // means video public krna hai nhi krna hai etc
        default: true
    },


    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps : true})

videoSchema.plugin(mongooseAggregatePaginate)


export const Video= mongoose.model("video", videoSchema)