const mongoose = require("mongoose");
const mongoPath  = "mongodb+srv://bee:bee123@databot.f96oe.mongodb.net/data"

module.exports = async () => {
    await mongoose.connect(mongoPath, {

    });
    return mongoose;
}