import mongoose from 'mongoose';

const connectDb = async() =>{
    const uri = process.env.MONGODB_URI
    try{
        const connection = await mongoose.connect(uri);
        if(connection){
            console.log("Connected to Database ");
        }
        else{
            console.log("Could not connect to Database");
        }
    }catch(e){
        console.log("Error in connecting");
    }
}
export default connectDb;