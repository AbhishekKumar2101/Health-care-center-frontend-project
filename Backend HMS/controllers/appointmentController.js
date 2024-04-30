// controllers/appointmentController.js

const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res,next) => {
    try {
        console.log(req);
        console.log(req.body);
        const appointment = new Appointment(req.body);
        await appointment.save();
      
        res.json({message:"Appointment is confirmed at "+req.body.appointmentDate +" time : "+req.body.appointmentTime});
    } catch (err) {
       next(err);
    }
};
