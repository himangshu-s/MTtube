import multer from "multer"
// have to read the documentation of the multer. 

// what u can do is directly copy pasting the whole code base from the git documentatiuon of multer, but here we are doing som emodification

const storage= multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "./public/temp") // the null handles the error
filename: function(req, file, cb){
    cb(null, file.originalname)
}
    }
})

export const upload= multer({
    storage
})