const mongoose = require('mongoose')
const mongoSchema = new mongoose.Schema({
    email:{type:'string', riquire:true, unique:true},
    password:{type:'string', riquire:true}
});

module.exports = mongoose.model('admindata', mongoSchema)
