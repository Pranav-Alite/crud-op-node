export class ApiResponse {
    constructor(statusCode, data, message){
        this.status = statusCode
        this.data = data || "Nothing to send in data"
        this.message = message
    }
}