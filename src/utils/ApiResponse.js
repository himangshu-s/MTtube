// we are making this by opuirselves, cuz the request, response all this part of express, not node, so express dnt provide any built in class like node 
 class ApiResponse {
    constructor(statuscode, data, message= "success"){
        this.statuscode= statuscode
        this.data= data
        this.message=message
        this.success= statuscode < 400
    }
 }

 export {ApiResponse}