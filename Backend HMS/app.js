// Require necessary modules
const dotenv = require('dotenv'); 
dotenv.config(); 
const express = require('express');
const mongoose = require('mongoose');
const cookie  = require('cookie-parser')
// Create an instance of Express
const app = express();
const cors = require('cors');   
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware: Use express.json() to parse incoming JSON requests
app.use(express.json());
 app.use(cookie());
 const bodyparser = require('body-parser')


// MongoDB connection
mongoose.connect('mongodb+srv://Patil:Patil%402022@cluster0.ygrbuma.mongodb.net/hm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
// const patientRoutes = require('./routes/patientRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes=require('./routes/userRoutes')
// app.use('/patients', patientRoutes);
// app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/user',userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
