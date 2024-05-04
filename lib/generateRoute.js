function generateRoute(moduleName, routeName, controllerName, properties) {
    const routeContent = `
  const express = require('express');
  const router = express.Router();
  const ${controllerName} = require('../controllers/${controllerName}');
  
  router.get('/', ${controllerName}.getAll${moduleName}s);
  router.get('/:id', ${controllerName}.get${moduleName}ById);
  ${properties.map(prop => `
  router.put('/:id/${prop}', ${controllerName}.update${moduleName}${prop});
  `).join('')}
  
  module.exports = router;
    `;
    return routeContent;
  }
  
  module.exports = generateRoute;
  