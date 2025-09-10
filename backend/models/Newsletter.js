const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  city: {
    type: String,
    enum: [
      'essen', 'dortmund', 'duisburg', 'bochum', 'gelsenkirchen', 
      'oberhausen', 'herne', 'hamm', 'mülheim-an-der-ruhr', 
      'hattingen', 'recklinghausen', 'moers', 'other'
    ]
  },
  interests: [{
    type: String,
    enum: [
      'musik', 'kunst', 'theater', 'sport', 'familie', 
      'kultur', 'industrie', 'festival', 'markt', 'workshop'
    ]
  }],
  language: {
    type: String,
    enum: ['de', 'en', 'tr', 'pl', 'ru', 'ar', 'fr', 'es'],
    default: 'de'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  confirmationToken: String,
  isConfirmed: {
    type: Boolean,
    default: false
  },
  confirmedAt: Date,
  unsubscribeToken: {
    type: String,
    unique: true
  },
  source: {
    type: String,
    enum: ['website', 'event', 'admin', 'import'],
    default: 'website'
  },
  tags: [String],
  lastEmailSent: Date,
  bounced: {
    type: Boolean,
    default: false
  },
  bouncedAt: Date,
  bouncedReason: String
}, {
  timestamps: true
});

// Generate unsubscribe token before saving
newsletterSchema.pre('save', function(next) {
  if (!this.unsubscribeToken) {
    this.unsubscribeToken = require('crypto').randomBytes(32).toString('hex');
  }
  next();
});

// Virtual for full name
newsletterSchema.virtual('fullName').get(function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.email;
});

// Ensure virtual fields are serialized
newsletterSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);
