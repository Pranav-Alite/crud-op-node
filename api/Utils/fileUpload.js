import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './api/uploads/profile/')
    },
    filename: (req, file, cb) => {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const fileExtension = file.originalname.split('.')[1]
            const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
            if (!allowedMimeTypes.includes(file.mimetype)) {
                return cb(new Error('Invalid file type. Please upload a valid image file.'))
            }
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
        } catch (error) {
            throw error
        }
    }
})

const upload = multer({ storage: storage })

export const profileUpload = upload.single('profileImg')