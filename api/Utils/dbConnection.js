import mongoose from "mongoose"

export const connectDB = mongoose.connect('mongodb://pranav:pranav@localhost:27017/crudDb', { autoIndex: false })

mongoose.connection.on('connected', () => console.log('MongoDB Connected !'));
mongoose.connection.on('disconnected', () => console.log('Ooopps ! MongoDB disconnected!'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));