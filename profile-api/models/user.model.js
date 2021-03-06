const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const userSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: 'email is required', 
        validate: emailPattern
    },
    password:{
        type: String,
        required: 'password is required', 
        validate: passwordPattern
    },
    campus: {
        type: String,
        enum: ['Madrid', 'Barcelona', 'Miami', 'Paris', 'Berlin', 'Amsterdam', 'México', 'Sao Paulo'],
        required: 'campus required'
    },
    course: {
        type: String,
        enum:['WebDev', 'UX/UI', 'Data Analytics'],
        required: 'course required'
    },
    avatarURL: {
        type: String,
    }
},{timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
          ret.id = doc._id;
          delete ret._id;
          delete ret.__v;
          delete ret.password;
          return ret;
        }
      }
})

userSchema.pre('save', function(next) {
    const user = this;
    
    if (!user.isModified('password')) {
      next();
    } else {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(user.password, salt)
            .then(hash => {
              user.password = hash;
              next();
            })
        })
        .catch(error => next(error))
    }
  });
  
  userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

const User = mongoose.model('User', userSchema)

module.exports = User;