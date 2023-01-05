import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default:false, required: true },
        
    },
    {
        timestamps: true,
    }
);

// ***comparing the pw for the login route
userSchema.methods.matchPassword = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password);
};

// ***hashing the pw for the signup route
userSchema.pre("save",async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// ***creating the jwt token
userSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id }, process.env.jwt_secret, { expiresIn: "9d" });
};

const User = mongoose.model("User", userSchema);

export default User;
