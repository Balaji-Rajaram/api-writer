function generateModel(moduleName, properties) {
    const modelContent = `
  const mongoose = require('mongoose');
  
  const ${moduleName}Schema = new mongoose.Schema({
  ${properties.map(prop => `  ${prop}: { type: String, required: true },`).join('\n')}
  });
  
  module.exports = mongoose.model('${moduleName}', ${moduleName}Schema);
    `;
    return modelContent;
  }
  
  module.exports = generateModel;
  