const mongoose = require('mongoose')
const mongoSchema = new mongoose.Schema({
    fullName:{type:'string', riquire:true},
    email:{type:'string', riquire:true, unique:true},
    phone:{type:'string',  riquire:true, unique:true},
    password:{type:'string', riquire:true}
});

// mongoSchema.pre('save', function (next) {
//     const user = this;
  
//     // Only hash the password if it is new or has been modified
//     if (!user.isModified('password')) return next();
  
//     // Hash the password
//     bcrypt.hash(user.password, 10, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
  

module.exports = mongoose.model('userdata', mongoSchema)
