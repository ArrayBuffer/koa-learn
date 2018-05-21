const queue = [];

const obj = {
  count: 0
};

const getList1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('getList1')
    }, 200)
  })
}

const getList2 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('getList2')
    }, 200)
  })
}

const getList3 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('getList3')
    }, 200)
  })
}

queue.push(async (obj, next) => {
  console.log('begin----1');
  let data = await getList1();
  console.log(data)
  await next();
  console.log('end----1');
});

queue.push(async (obj, next) => {
  console.log('begin----2');
  let data = await getList2();
  console.log(data)
  await next();
  console.log('end----2');
});

queue.push(async (obj, next) => {
  console.log('begin----3');
  let data = await getList3();
  console.log(data)
  await next();
  console.log('end----3');
});


function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    // console.log(middleware);
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

function factory (middlewares) {
  return function () {
    
  }
}

let fn = compose(queue);

fn(obj).then(res => {
  console.log(res);
})