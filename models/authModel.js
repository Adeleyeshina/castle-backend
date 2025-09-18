import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenth: [6, 'Password must be at least 6 characters']
    },

})

const User = mongoose.model("User", userSchema);
export default User;