function throttle(f, interval) {
  var last = null;
  var timeout = null;
  return function() {
    var now = Date.now();
    var delay = last === null ? interval : interval - (now - last);
    clearTimeout(timeout);
    var that = this;
    var args = arguments;
    timeout = setTimeout(function() {
      timeout = null;
      last = Date.now();
      f.apply(that, args);
    }, delay);
  }
}

module.exports = throttle;
