# an Youtube clone
# to use import instead of require , we need to add the type:module in the package.json.
# this is module js, the  other one is commonJs
# after that install nodemon for automatic server restart
# after this , the nodemon will restart the server , but we have to tell him na ki restart kro, so in the package.json , in scripts , instead of test , the whole line (since we dnt need test), we write ,
"dev": "nodemon src/index.js"

# now inside src, we neeed some folders like controllers= we write the logic here, db= database connection and all, middlewares= when we want to run soemthung inbetween of request and respond like checking the cookied and all, models= data models, routes, utils = utility like file upload , mails etc etc. 

# DevDependencies in a package.json file are software tools and packages that you only need while building and testing your app. Unlike core dependencies, they are excluded from production deployments to keep your final bundle lightweight

# after installing prettier, make an file .prettierrs