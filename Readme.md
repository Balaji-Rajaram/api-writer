
![Project Banner](https://balaji-alpha.vercel.app/img/apiwriterIcon.png)


### Description

`api-writer` is a tool for quickly generating a Node.js project with MongoDB integration. It sets up a basic API server using Express.js for routing, MongoDB for data storage, and includes automatic generation of models, controllers, and routes for each module.

### Usage

Import package

```javascript
const apiWriter = require('api-writer');
```
Define your schema

```javascript
const modules = [
  {
    name: 'User',
    properties: ['id', 'name', 'email'],
    additionalApis: [
      { method: 'POST', controllerFunction: 'createUser' },
      { method: 'DELETE', controllerFunction: 'deleteUserById' }
    ]
  },
  {
    name: 'Post',
    properties: ['id', 'title', 'content'],
    additionalApis: [
      { method: 'PUT', controllerFunction: 'updatePostTitle' }
    ]
  }
];
```
Generate project

``` javascript 
const projectName = 'projectAlpha';
apiWriter(projectName, modules);
```


### Features

- Generates a basic Node.js project structure with MongoDB integration.
- Automatically generates MongoDB models, controllers, and routes for each module.
- Supports additional APIs for modules.
- Includes MongoDB configuration.
- Uses Express.js for routing.
- Easy to customize and extend.

### Project Structure

 - `app.js` : Main entry point of the application.
 - `server.js` : Starts the server.
 - `dbConfig.js` : MongoDB configuration.
 - `models/<Module>Model.js` : Directory for models
 - `routes/<Module>Route.js` : Directory for routes
  - `controllers/<Module>Controller.js` : Directory for controllers.
 - `package.json` : Project metadata and dependencies.

### Contributing
Contributions are welcome! Please submit pull requests to contribute to this project.

### Licence
This project is licensed under the MIT License.


