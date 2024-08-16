import { user, userSchema } from '../Model/user.model.js'
import { HttpError } from './HttpError.js'
import bcrypt from 'bcrypt'
import fs from 'fs'

export const fetchUserById = async (id) => {
    try {
        const users = await user.findOne({ _id: id }, '-password -__v')
        if (!users || users == "") {
            const allUsers = await user.find({}, '-password -__v')
            return allUsers
        }
        return users
    } catch (error) {
        throw error
    }
}

export const createUser = async (userData) => {
    try {
        if (!userData) {
            throw new HttpError(400, 'UserData is required')
        }
        const findUser = await user.findOne({ email: userData.email })

        if (findUser) {
            await fs.unlink('./api/uploads/profile/' + userData.profileImg, (err) => { console.log(err) })
            throw new HttpError(409, 'Email is already Registered')
        }

        // if (userData.password) userData.password = await bcrypt.hash(userData.password, 10)
        const newUser = await user.create(userData)
        await newUser.validate()

        await newUser.save()

        const userDataToReturn = await fetchUserById(newUser._id)
        return userDataToReturn
    } catch (error) {
        throw error
    }
}
export const updateUser = async (userData) => {
    try {
        if (!userData) {
            throw new HttpError(400, 'UserData is required')
        }
        const findUser = await user.findOne({ _id: userData._id })
        console.log("🚀 ~ updateUser ~ findUser:", findUser)
        
        if (!findUser) {
            await fs.unlink('./api/uploads/profile/' + findUser.profileImg, (err) => { console.log(err) })
            throw new HttpError(404, 'User doesnot exist')
        }

        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10)
        const newUser = await user.findByIdAndUpdate({ _id: userData._id }, userData, { new: true })
        await newUser.validate()
        await newUser.save()

        if(findUser.profileImg !== newUser.profileImg || ""){
            await fs.unlink('./api/uploads/profile/' + findUser.profileImg, (err) => { console.log(err) })
        }

        const userDataToReturn = await fetchUserById(newUser._id)
        return userDataToReturn
    } catch (error) {
        throw error
    }
}

export const fetchUser = async () => {
    try {
        const users = await user.find({}, '-password -__v')
        if (!users || users == "") {
            throw new HttpError(404, 'User Not Found')
        }
        return users
    } catch (error) {
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        if (!id) {
            throw new HttpError(400, 'User Id is required to Delete the User')
        }
        const findUser = await user.findOne({ _id: id })
        if (!findUser) {
            throw new HttpError(404, 'User with this ID does not Exist')
        }

        await user.findByIdAndDelete({ _id: id })
        await fs.unlink('./api/uploads/profile/' + findUser.profileImg, (err) => (console.log(err)))
        return true
    } catch (error) {
        throw error
    }
}

export const deleteUserProfile = async (id) => {
    try {
        if (!id) {
            throw new HttpError(400, 'User Id is required to Delete the User Profile')
        }

        const findUser = await fetchUserById(id)
        if (!findUser) {
            throw new HttpError(404, 'User with this ID does not Exist')
        }

        await fs.unlink('./api/uploads/profile/' + findUser.profileImg, (err) => (console.log(err)))

        const delResult = await user.findByIdAndUpdate({ _id: id }, { profileImg: "" }, { new: true })
        if (!delResult) {
            throw new HttpError(500, 'Due to Internal Server Error, User is Not Deleted')
        }

        const users = await fetchUserById(delResult._id)
        return users
    } catch (error) {
        throw error
    }
}