function throttle(f, interval) {
  var last = null;
  var timeout = null;
  return function() {
    var now = Date.now();
    // Initial delay required by the tests.
    var delay = last === null ? interval : interval - (now - last);
    if (delay <= 0) {
      last = now;
      f.apply(this, arguments);
    }
    else {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      var that = this;
      var args = arguments;
      timeout = setTimeout(function() {
        timeout = null;
        last = Date.now();
        f.apply(that, args);
      }, delay);
    }
  }
}

module.exports = throttle;
