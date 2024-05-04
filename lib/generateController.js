function generateController(moduleName, controllerName, properties, additionalApis) {
    const controllerContent = `
  const ${moduleName}Model = require('../models/${moduleName}');
  

  
  exports.getAll${moduleName}s = async (req, res) => {
    try {
      const ${moduleName.toLowerCase()}s = await ${moduleName}Model.find();
      res.json(${moduleName.toLowerCase()}s);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.get${moduleName}ById = async (req, res) => {
    try {
      const ${moduleName.toLowerCase()} = await ${moduleName}Model.findById(req.params.id);
      if (!${moduleName.toLowerCase()}) {
        return res.status(404).json({ message: '${moduleName} not found' });
      }
      res.json(${moduleName.toLowerCase()});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  ${properties.map(prop => `
  exports.update${moduleName}${prop} = async (req, res) => {
    try {
      const updated${moduleName} = await ${moduleName}Model.findByIdAndUpdate(req.params.id, { ${prop}: req.body.${prop} }, { new: true });
      if (!updated${moduleName}) {
        return res.status(404).json({ message: '${moduleName} not found' });
      }
      res.json(updated${moduleName});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  `).join('\n')}
  
  ${additionalApis.map(api => `
  exports.${api.controllerFunction} = async (req, res) => {
    try {
      // Implement ${api.controllerFunction} logic
      res.json({ message: '${api.controllerFunction} API for ${moduleName}' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  `).join('\n')}
    `;
    return controllerContent;
  }
  
  module.exports = generateController;
  