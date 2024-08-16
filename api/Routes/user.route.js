import { createUserController, fetchUserController,  deleteUserController, deleteUserProfileController } from "../Controllers/user.controller.js"
import { validateUpdateData, validateFn } from "../Middlewares/validate.data.js"
import express from "express"
import { profileUpload } from "../Utils/fileUpload.js"

const app = express()

app.route('/create').post(profileUpload, [validateUpdateData, validateFn], createUserController)

app.route('/fetchUser').get(fetchUserController)

app.route('/delete').delete(deleteUserController)

app.route('/deleteProfile').delete(deleteUserProfileController)

export default app