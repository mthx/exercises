function memoize(f) {
  var cache = {}
  return function() {
    var key = JSON.stringify(Array.prototype.slice.apply(arguments));
    var result;
    if (key in cache) {
      result = cache[key];
    }
    else {
      result = f.apply(null, arguments);
      cache[key] = result;
    }
    return result;
  }
}

module.exports = memoize
