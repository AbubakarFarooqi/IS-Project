// this class is used to handle responses

class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode;
  }
}

export default ApiResponse;
