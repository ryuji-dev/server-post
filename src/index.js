import app from './app.js';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/server-post')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })