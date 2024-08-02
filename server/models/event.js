const { default: mongoose } = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    start: Date,
    end: Date,
    participants: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;