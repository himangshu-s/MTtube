// here we are taking all the proiperties from Error class and we can over right it.
//  This means ApiError can do everything an Error can, plus your custom features. 
class ApiError extends Error { // so here we are inhereting the Error class from node js to the ApiError class.
    constructor(
        statusCode ,
        message= "somehthing went wrong",
        errors =[],
        stack =""
    ){
        super(message) 
        /*
        super(message) calls the constructor of the parent Error class and initializes all the built-in error properties, such as message. Since ApiError extends Error, JavaScript requires the parent constructor to run before using this. Without calling super(), the Error object is not properly initialized, and JavaScript throws a ReferenceError.
        */
        this.statusCode=statusCode // left side means= Create a property called statusCode inside this object.
        this.data= null
        this.message= message
        this.success= false; // There is no success property in JavaScript's built-in Error class.You are creating your own property.


        this.errors= errors

        if(stack){
            this.stack = stack
        } else{
            Error.captureStackTrace(this,this.constructor)

    /*
A stack trace records the sequence of function calls that led to an error, making debugging easier by showing the file, function, and line number where the error originated. If a custom stack trace is provided, it is assigned to `this.stack`; otherwise, `Error.captureStackTrace(this, this.constructor)` automatically generates one for the current `ApiError` object, starting from where the error was created.
*/
        }
        
    }

}

export default ApiError;
 
/*
The constructor is a special method that runs automatically whenever a new ApiError object is created using `new ApiError(...)`. The values passed while creating the object (such as statusCode, message, errors, and stack) become the constructor arguments, which are then used to initialize the object's properties. `super(message)` calls the parent Error class constructor to set the default error message, while `this.statusCode`, `this.message`, `this.errors`, etc., create and store custom properties specific to ApiError. Default values like `message = "Something went wrong"` and `errors = []` are used when those arguments are not provided, ensuring every error object has a consistent structure.
*/
/* A constructor is a special method that runs automatically whenever you create a new object of a class.

Example:

class Student {
    constructor(name) {
        this.name = name;
    }
}

Now,

const s1 = new Student("Himangshu");

As soon as you write new Student("Himangshu"), JavaScript automatically executes

constructor("Himangshu")

So the constructor's job is to initialize the object.*/

