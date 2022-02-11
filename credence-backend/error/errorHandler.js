const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    console.log(err);
      // Mongoose validation error
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message);
  }
   // Mongoose duplicate key
   if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
  }
    res.status(400).json({
        success: false,
        error: error.message || 'Server Error'
      });
};

module.exports=errorHandler;