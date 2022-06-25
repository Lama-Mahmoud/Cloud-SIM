const { Int32, Double } = require('mongodb');
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
      },

    phone:{
        type: Number,
        required:true
      },

    Relation: {
        type: String,
        required: true,
        min: 6,
        max: 25,

      },

    location:{
          long:{
            type: Double,
            required:true
          },
          lat:{
            type: Double,
            required:true
          }

      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
      },
      
});

module.exports = mongoose.model('Contact', contactSchema);