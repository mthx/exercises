function flattenThunk(thunk) {
  return function(ultimateCallback) {
    var recurse = function(err, result) {
      if (err) {
        ultimateCallback(err, null);
      }
      else if (typeof result === 'function') {
        result(recurse);
      }
      else {
        ultimateCallback(null, result);
      }
    }
    thunk(recurse);
  }
}

module.exports = flattenThunk
