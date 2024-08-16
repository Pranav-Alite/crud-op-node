import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const userSchema = new Schema({
    _id: {
        type: String,
        default: () => {
            const randomBytes = crypto.randomBytes(12)
            return randomBytes.toString('base64').slice(0, 16).replace(/[+\/=]/g, '')
        },
        unique: true,
    },
    firstName: {
        type: String,
        // required: true,
        minlength: 3,
        maxlength: 15,
    },
    lastName: {
        type: String,
        // required: true,
        minlength: 3,
        maxlength: 15,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    gender: {
        type: String,
        // required: true,
        enum: ['Male', 'Female', 'male', 'female'],
        lowercase: true,
    },
    profileImg: {
        type: String,
        // required: true,
    },
    phone: {
        type: Number,
        // required: true,
        validate: {
            validator: function (value) {
                return /^\d{10,12}$/.test(value)
            },
            message: props => `${props.value} is not a valid Phone Number.`
        }
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: props => `${props.value} is not a valid password. It must contain at least one special character, one uppercase letter, one lowercase letter, and one number.`
        }
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const user = new mongoose.model('user', userSchema) 