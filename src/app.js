const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('begin-1');
  next();
  console.log('end-1');
})

app.use(async (ctx, next) => {
  console.log('begin-2');
  next();
  console.log('end-2');
})

app.use(async (ctx) => {
  ctx.body = 'hello world'
});

app.listen(3000)