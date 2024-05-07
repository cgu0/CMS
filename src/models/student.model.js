const { Schema, model } = require("mongoose");
const Joi = require('joi');

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      alias:'name',
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate:[
        {
          validator:(email)=>{
            // regex 正则表达式 字符串验证  or
            // use validation library
            //Joi
            return Joi.string().email().validate(email).error === undefined;
          },
          msg: "Invalid email format"
        }
      ]
    },
    courses: [ //这里是一个数组，里面存的是course的id，所以这里是一个一对多的关系
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true,
    toJSON: {
        virtuals: true,
      },
   },
);

const Student = model("Student", studentSchema);

module.exports = Student;
