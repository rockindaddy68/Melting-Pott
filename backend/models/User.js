const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  city: {
    type: String,
    enum: [
      'essen', 'dortmund', 'duisburg', 'bochum', 'gelsenkirchen', 
      'oberhausen', 'herne', 'hamm', 'mülheim-an-der-ruhr', 
      'hattingen', 'recklinghausen', 'moers'
    ]
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  favoriteEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  newsletterSubscribed: {
    type: Boolean,
    default: false
  },
  preferences: {
    language: {
      type: String,
      enum: ['de', 'en', 'tr', 'pl', 'ru', 'ar', 'fr', 'es'],
      default: 'de'
    },
    eventCategories: [String],
    emailNotifications: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get user's full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
