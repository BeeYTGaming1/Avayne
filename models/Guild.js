const mongo = require("mongoose")

const reqString = {
    type: String,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

module.exports = mongo.model('Guild', new mongo.Schema({
    id: String,
    Current: Number,
    Channel: String,
    prefix: reqString,
    language: reqString,
    invite_leaderboard: reqBoolean,
}))