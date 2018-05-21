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

const getList1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('getList1')
    }, 200)
  })
}

queue.push(async (obj, next) => {
  console.log('begin----1');
  next();
  console.log('end----1');
});

queue.push(async (obj, next) => {
  console.log('begin----2');
  next();
  console.log('end----2');
});

queue.push(async (obj, next) => {
  console.log('begin----3');
  next();
  console.log('end----3');
});


function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

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

let fn = compose(queue);

fn(obj).then(res => {
  console.log(res);
})