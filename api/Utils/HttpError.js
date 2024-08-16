export class HttpError extends Error {
    constructor(statusCode, message){
        super()
        this.status = statusCode
        this.message = message
    }
}