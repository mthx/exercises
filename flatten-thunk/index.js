function flattenThunk(thunk) {
  return function(ultimateCallback) {
    var recurse = function(err, result) {
      if (typeof result === 'function') {
        result(recurse);
      }
      else {
        ultimateCallback(err, result);
      }
    }
    thunk(recurse);
  }
}

module.exports = flattenThunk
