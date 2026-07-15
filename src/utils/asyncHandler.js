// so every time we talk to the databse, are we gonna write the try catch wapper every time i use, no right, so we made an utility file insiod which tghere is geenralised function for this. and everytime wehen we neeed to connect with the databases, we just call this function.  
const asyncHandler =(requestHandler)=>{
    (req,res, next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next())
    }


 }


export default asyncHandler;
/*
this is for try catch part, but we will use promise 

const asyncHandler =(fn)=>async (req, res ,next)=>{

    try{
await fn(req,res,next)
    } catch(error){
      res.status(error.code || 500).json({
        success: false,
        message: error.message
      })
    }
} 
 // its a higher order function that can accpet function as a paremeter. 
/*
const asyncHandler = (fn) => {
    return () => {
        // code goes here
    };
};

// //// asyncHandler takes a function (fn) as input and returns a new function that wraps and executes it.
*/

