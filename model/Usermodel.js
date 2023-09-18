import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true, 'Please fill out the name'],
        validate:validator.trim //Validation of Username
    },
    password:{
        type : String,
        required : [true, 'Please fill out the password'],
        minlength : [8,"Password should be 8 character"],
        select:true
    }
},{timestamps:true});


//password hashing
UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});


//password comparison
UserSchema.methods.Compared = async function(userpassword){
    const ismatch = await bcrypt.compare(userpassword, this.password)
    return ismatch;
}


//Json web token creation
UserSchema.methods.createJWT = function(){
    return JWT.sign({userid:this._id},process.env.JWT_Secret,{expiresIn:'1d'})
}


export default mongoose.model('User', UserSchema);