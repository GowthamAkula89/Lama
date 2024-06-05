//Return a function that catches and forwards any error a function throws to the next middleware 
function catchAsync(fn) {
    return function(req, res, next) {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    }
  }
  
  module.exports = catchAsync;
  