const only = function (obj, keys) {
  obj = obj || {};
  keys = keys || [];
  if ('string' === typeof keys) {
    keys = keys.split(/ +/);
  }
  return keys.reduce((ret, key) => {
    console.log(ret, key);
    if (null == obj[key]) return ret;
    ret[key] = obj[key];
    return ret;
  }, {})
}

var ret = only({name: 'gaollard', age: 25});
console.log(ret)