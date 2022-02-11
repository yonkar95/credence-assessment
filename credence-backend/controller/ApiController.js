
const Movie = require('../models/Movie');

exports.create = async (req, res,next) => {
    try {
        const movie = await Movie.create(req.body);
      res
        .status(200)
        .json({ success: true, data: movie });
    } catch (e) {
      next(e);
    }
  };

  exports.getOne = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
          res
          .status(404)
          .json({ success: false, message: "Record not found" });
        }
      res
        .status(200)
        .json({ success: true, data: movie });
    } catch (e) {
        console.log(e);
      res
        .status(400)
        .json({succes:false});
    }
  };
  

  exports.update = async (req, res) => {
    try {
       const movie = await Movie.findByIdAndUpdate(req.params.id, req.body,
        {
          new: true
        });
      res
        .status(200)
        .json({ success: true, data: movie });
    } catch (e) {
        console.log(e);
      res
        .status(400)
        .json({succes:false});
    }
  };
  
  exports.delete = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
          res
          .status(404)
          .json({ success: false, message: "Record not found" });
        }else{
          await movie.remove();
      res
        .status(200)
        .json({ success: true, data: {} });
        }
    } catch (e) {
        console.log(e);
      res
        .status(400)
        .json({succes:false});
    }
  };