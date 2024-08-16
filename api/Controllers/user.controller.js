import { createUser, deleteUser, fetchUserById, deleteUserProfile, updateUser } from "../Utils/dbFunction.js"
import { HttpError } from "../Utils/HttpError.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import fs from "fs"

export const createUserController = async (req, res) => {
    try {
        const profileImg = req.file.filename
        const userData = req.body
        if (!userData) {
            throw new HttpError(400, 'All UserData Fields are Required')
        }
        userData.profileImg = profileImg || ""

        if (!userData._id) {
            const createdUser = await createUser(userData)
            if (!createdUser) {
                // return res.json(new ApiResponse(201, createdUser, 'User Created Successfully'))
                throw new HttpError(500, 'Due to Internal Server Error, User is not created')
            }
            return res.json(new ApiResponse(201, createdUser, 'User Created Successfully'))
        }
        const updateRes = await updateUser(userData)
        if (!updateRes) {
            // return res.json(new ApiResponse(201, createdUser, 'User Created Successfully'))
            throw new HttpError(500, 'Due to Internal Server Error, User is Not created')
        }
        res.json(new ApiResponse(200, updateRes, 'User Updated Successfully'))

        // updateUser


    } catch (error) {
        res.status(error.status || 400).json(new ApiResponse(error.status || 400, "", error.message))
    }
}

export const fetchUserController = async (req, res) => {
    try {
        const { _id } = req.query
        const resultById = await fetchUserById(_id)

        if (!resultById) {
            throw new HttpError(500, 'Internal Server Error')
        }
        res.json(new ApiResponse(200, resultById, 'User Fetched Successfully'))
    } catch (error) {
        res.status(error.status || 400).json(new ApiResponse(error.status || 400, '', error.message))
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { _id } = req.query
        if (!_id) {
            throw new HttpError(400, 'User Id is required to Delete the User')
        }
        const deleteResult = await deleteUser(_id)
        if (!deleteResult) {
            throw new HttpError(500, 'Due to Internal Error, User is not Deleted')
        }
        res.json(new ApiResponse(200, '', 'User Deleted Successfully'))
    } catch (error) {
        res.status(error.status || 400).json(new ApiResponse(error.status || 400, '', error.message))
    }
}

export const deleteUserProfileController = async (req, res) => {
    try {
        const { _id } = req.query
        if (!_id) {
            throw new HttpError(400, 'User Id is required to Delete the User Profile Image')
        }
        const deleteResult = await deleteUserProfile(_id)
        if (!deleteResult) {
            throw new HttpError(500, 'Due to Internal Error, User is not Deleted')
        }
        res.json(new ApiResponse(200, deleteResult, 'User Profile Image Deleted Successfully'))
    } catch (error) {
        res.status(error.status || 400).json(new ApiResponse(error.status || 400, '', error.message))
    }
}