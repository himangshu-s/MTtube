/*
asyncHandler is a higher-order function that takes an async route handler (requestHandler)
and returns a new Express middleware function. Express executes this returned middleware
for every request, which then calls requestHandler(req, res, next). Promise.resolve(...).catch(next)
automatically catches any async errors and forwards them to Express's error-handling middleware,
saving us from writing try...catch and next(err) in every route. This is different from the
try...catch used in connectDB(), which only handles database connection errors during server startup.
*/

const asyncHandler =(requestHandler)=>{
    return (req,res, next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next())
    }


 }


export default asyncHandler;
/* asyncHandler takes an async requestHandler function as an
 argument and returns a new Express middleware
  function (req, res, next). When a request comes ,  Express executes this returned
   middleware, it calls requestHandler(req, res, next) and 
   automatically catches any errors using Promise.resolve(...).catch(next), forwarding them to Express's error handler.
*/

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

