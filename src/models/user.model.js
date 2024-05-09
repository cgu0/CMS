const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, //独一无二,可以修改username，与_id不同
  },

  password: {
    type: String,
    required: true,
  },
//   role: {
//     type: String,
//     enum: ["admin", "user"],
//   },
});

module.exports = model("User", schema);
