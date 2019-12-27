export default app => {
  const logger = app.getLogger();

  return async (ctx, next) => {
    const { packet } = ctx;
    const [ eventName, args, callback ] = packet;
    const [ namespace, moduleName, methodName ] = eventName.split('.');
    if (namespace === 'generator') {
      const { generator } = app;
      callback(null, await generator[moduleName][methodName](args, ctx));
    }
    await next();
  };
};