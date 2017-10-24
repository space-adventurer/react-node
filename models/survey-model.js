const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = require('./recipient-schema');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    // Every survey belongs to particular user.
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    deteSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);
