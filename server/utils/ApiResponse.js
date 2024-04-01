class apiResponse {
  constructor(statuscode, message, data, success) {
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
  toJson() {
    return {
      statusCode: this.statuscode,
      message: this.message,
      data: this.data,
      success: this.success,
    };
  }
}

export default apiResponse;
