function curryHelper(fixed, f) {
  return function() {
    var actualArgs = fixed.slice();
    Array.prototype.push.apply(actualArgs, arguments);
    if (actualArgs.length === f.length) {
      return f.apply(null, actualArgs);
    }
    else {
      return curryHelper(actualArgs, f);
    }
  }
}

module.exports = function(f) {
  return curryHelper([], f);
}
