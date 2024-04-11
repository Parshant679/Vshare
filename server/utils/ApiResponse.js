class apiResponse {
  constructor(statuscode, message, data, success) {
    this.statuscode = statuscode;
    this.message = message;
    this.data = data;
    this.success = success < 400;
  }
}

export { apiResponse };
