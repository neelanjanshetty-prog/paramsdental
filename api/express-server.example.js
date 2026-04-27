/*
  Example backend starter for teams that want to move booking and inquiry data
  into a dedicated Node.js + Express + MongoDB service.

  Copy this file into your backend project and install:
  npm install express mongoose cors dotenv
*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection failed', error));

const appointmentSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    email: String,
    service: String,
    preferredDate: String,
    preferredTime: String,
    message: String,
  },
  { timestamps: true }
);

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
const Inquiry = mongoose.model('Inquiry', inquirySchema);

app.post('/api/appointments', async (request, response) => {
  const booking = await Appointment.create(request.body);
  response.json({ success: true, data: booking });
});

app.post('/api/inquiries', async (request, response) => {
  const inquiry = await Inquiry.create(request.body);
  response.json({ success: true, data: inquiry });
});

app.listen(4000, () => {
  console.log('Express API listening on port 4000');
});
