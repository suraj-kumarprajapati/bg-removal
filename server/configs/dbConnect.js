import mongoose from "mongoose"


const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
    
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
    } 
    catch(error) {
        console.log('Database connection failed...');
    }
}

export default connectDB;

