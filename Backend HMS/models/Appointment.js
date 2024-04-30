const mongoose = require('mongoose');

// Define patient schema
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }
});

// Create patient model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
