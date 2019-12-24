export default app => {
  const logger = app.getLogger();

  return async (ctx, next) => {
    const { packet } = ctx;
    const { generator } = app;

    console.log('*********8*99*****')
    console.log(generator.ready.toString())
    
    await next();
  };
};
