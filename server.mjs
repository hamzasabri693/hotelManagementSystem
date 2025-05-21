import express from 'express';
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import roomRoutes from './routes/roomRoutes.mjs'
import bookingRoutes from './routes/bookingRoutes.mjs'
import reservationRoutes from './routes/reservationRoutes.mjs'
import billingRoutes from './routes/billingRoutes.mjs'
import housekeepingRoutes from './routes/housekeepingRoutes.mjs'
import maintenanceRoutes from './routes/maintenanceRoutes.mjs'
import reportRoutes from './routes/reportRoutes.mjs'
import feedbackRoutes from './routes/feedbackRoutes.mjs'
import notificationRoutes from './routes/notificationRoutes.mjs'

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hello World')
})
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/roomBooking', bookingRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/billing',billingRoutes);
app.use('/api/housekeeping', housekeepingRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/report',reportRoutes)
app.use('/api/feedback',feedbackRoutes)
app.use('/api/notification',notificationRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


