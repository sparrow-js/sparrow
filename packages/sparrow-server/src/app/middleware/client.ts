
export default function() {
  return async function client(ctx, next) {
    if (String(ctx.path).indexOf('/api') === 0) {
      await next();
      return;
    }

    ctx.clientConfig = {
      socketUrl: `//127.0.0.1:${process.env.PORT}/`,
      apiUrl: `//127.0.0.1:${process.env.PORT}/api/`,
    };

    await next();
  };
}
