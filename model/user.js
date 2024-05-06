const mongooose = require('mongoose')
const {Schema} = mongooose;

const userSchema = new Schema({
    name: {type: String, required: true},
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
    password: {type: String, minLength: 6, required: true},
    token: String,
})

exports.User = mongooose.model('User', userSchema);