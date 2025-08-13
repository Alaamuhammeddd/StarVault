const serverless = require("serverless-http");
const app = require("../server"); // <-- Make sure this path is correct

module.exports = serverless(app);
