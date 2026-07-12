# an Youtube clone
# to use import instead of require , we need to add the type:module in the package.json.
# this is module js, the  other one is commonJs
# after that install nodemon for automatic server restart
# after this , the nodemon will restart the server , but we have to tell him na ki restart kro, so in the package.json , in scripts , instead of test , the whole line (since we dnt need test), we write ,
"dev": "nodemon src/index.js"