const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please add a movie Name'],
        unique: true,
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
      },
      img: {
        type: String,
        required: [true, 'Please add a image']
      },
      summary: {
        type: String,
        required: [true, 'Please add a summary']
      }
    }
      );
 module.exports = mongoose.model('Movie', MovieSchema);
