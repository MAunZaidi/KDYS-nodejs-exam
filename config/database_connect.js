import mongoose from 'mongoose';

const ConnectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.ConnectionString);
        console.log("Database Connected: ",connection.connection.host,connection.connection.name);
    } catch (e) {
        console.log(e);
        process.exit(1)
        
    }
}

export default ConnectDB;