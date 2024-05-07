const { Schema, model } = require("mongoose");
const courseSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        minLength: 1,
    },
    description: {
        type: String,
        default: "This is a default description",
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
}, {timestamps: true})

const Course = model("Course", courseSchema);

module.exports = Course;