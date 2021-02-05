1. Installations 
    ```
        npm i nodemon --save-dev
        npm i express
        npm i mongodb
        npm i mongoose
        npm i validator
        npm i bcryptjs
    ``` 
2. Modifie scripts in package.json (start and dev)

    ```
    "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js"
    },
    ```
3. Start server with the new script 
    ```
        npm run dev
        /Users/aissa/mongodb/bin/mongod.exe --dbpath=/Users/aissa/mongodb-data
    ```
