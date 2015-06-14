function Middleware() {
  this.chain = [];
}

Middleware.prototype.use = function(f) {
  this.chain.push(f);
}

Middleware.prototype.go = function(done) {
  var index = 0;
  var chain = this.chain;
  var ctx = {};
  var next = function() {
    if (index < chain.length) {
      var step = chain[index++]
      step.call(ctx, next);
    }
    else {
      done.call(ctx);
    }
  };
  next();
}

module.exports = Middleware
