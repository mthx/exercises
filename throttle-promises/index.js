function resultStoringPromises(factories, results) {
  var next = 0;
  return function() {
    if (next < factories.length) {
      var index = next;
      return factories[next++]().then(function(resolved) {
        results[index] = resolved;
      });
    }
    return null;
  };
}

function chainedPromises(promise, morePromises) {
  return promise.then(function(resolved) {
    var next = morePromises();
    return next !== null ? chainedPromises(next, morePromises) : resolved;
  });
}

// We kick off `limit` chains of promises that store their results in an array.
function throttlePromises(limit, promiseFactories) {
  var results = [];
  var resultStoring = resultStoringPromises(promiseFactories, results);
  var initial = [];
  for (var i = 0; i < limit; ++i) {
    var promise = resultStoring();
    if (promise !== null) {
      initial.push(chainedPromises(promise, resultStoring));
    }
  }
  return Promise.all(initial).then(function() {
    return results;
  });
}

module.exports = throttlePromises
