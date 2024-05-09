const mongoose = require("mongoose")
const {Schema} = mongoose;

const collectionSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'User email required']
    },
    collection: {type: Object}
})

exports.Collection = mongoose.model('Collection', collectionSchema)