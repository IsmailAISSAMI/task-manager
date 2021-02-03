1. Installations 
    ```
        npm i nodemon --save-dev
        npm i express
        npm i mongodb
        npm i mongoose
        npm i validator
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
        npm start dev
    ```
