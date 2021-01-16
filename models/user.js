const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    trim: false,
  },
  password: {
      type: String,
      min: 8,
    },
  address: {
    type: String,

  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);