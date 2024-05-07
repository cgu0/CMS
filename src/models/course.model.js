const { Schema, model } = require("mongoose");
const courseSchema = new Schema ({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    description: {
        type: String,
    },
}, {timestamps: true})

const Course = model("Course", courseSchema);

module.exports = Course;