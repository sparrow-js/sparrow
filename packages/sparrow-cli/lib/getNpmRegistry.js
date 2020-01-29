const config = require('./config');

module.exports = async function(npmName, materialConfig, publishConfig) {
  let registry = 'https://registry.npmjs.org';
  if (publishConfig && publishConfig.registry) {
    registry = publishConfig.registry;
  } else if (process.env.REGISTRY) {
    // 兼容老的用法
    registry = process.env.REGISTRY;
  } else if (materialConfig && materialConfig.registry) {
    registry = materialConfig.registry;
  } else {
    const configRegistry = await config.get('registry');
    if (configRegistry) {
      registry = configRegistry;
    }
  }

  return registry;
};
