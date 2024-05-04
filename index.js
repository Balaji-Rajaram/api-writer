const fs = require('fs');
const path = require('path');
const generateModel = require('./lib/generateModel');
const generateController = require('./lib/generateController');
const generateRoute = require('./lib/generateRoute');

function generateProject(projectName, modules) {
  const projectDir = path.join(__dirname, projectName);
  fs.mkdirSync(projectDir);

  // Create package.json file
  const packageJsonContent = `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.12.6"
  }
}
  `;
  fs.writeFileSync(path.join(projectDir, 'package.json'), packageJsonContent);

  modules.forEach(module => {
    const { name, properties, additionalApis } = module;

    const moduleDir = path.join(projectDir, name);
    fs.mkdirSync(moduleDir);

    const modelContent = generateModel(name, properties);
    const controllerContent = generateController(name, `${name}Controller`, properties, additionalApis);
    const routeContent = generateRoute(name, name, `${name}Controller`, properties);

    fs.writeFileSync(path.join(moduleDir, `${name}Model.js`), modelContent);
    fs.writeFileSync(path.join(moduleDir, `${name}Controller.js`), controllerContent);
    fs.writeFileSync(path.join(moduleDir, `${name}Routes.js`), routeContent);
  });
  const dbConfigContent = `
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost:27017/${projectName}DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
    `;
    const dbConfig = path.join(projectDir, "config");
    fs.mkdirSync(dbConfig);
    fs.writeFileSync(dbConfig, dbConfigContent);

  // Create app.js
  const appContent = `
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dbConfig = require('./dbConfig');

app.use(bodyParser.json());
app.use(cors());

// Initialize routes
${modules.map(module => `const ${module.name}Routes = require('./routes/${module.name}Routes');`).join('\n')}
${modules.map(module => `app.use('/${module.name.toLowerCase()}s', ${module.name}Routes);`).join('\n')}

module.exports = app;
  `;
  fs.writeFileSync(path.join(projectDir, 'app.js'), appContent);

  // Create server.js
  const serverContent = `
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
  `;
  fs.writeFileSync(path.join(projectDir, 'server.js'), serverContent);
}

module.exports = generateProject;
