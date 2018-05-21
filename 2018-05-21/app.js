const Koa = require('koa');

const app = new Koa();

app.use(function *(req, res) {
  res.end(111)
})

app.listen(3000)