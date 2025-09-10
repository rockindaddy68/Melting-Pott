const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 300
  },
  category: {
    type: String,
    required: true,
    enum: [
      'musik', 'kunst', 'theater', 'sport', 'familie', 
      'kultur', 'industrie', 'festival', 'markt', 'workshop'
    ]
  },
  city: {
    type: String,
    required: true,
    enum: [
      'essen', 'dortmund', 'duisburg', 'bochum', 'gelsenkirchen', 
      'oberhausen', 'herne', 'hamm', 'mülheim-an-der-ruhr', 
      'hattingen', 'recklinghausen', 'moers'
    ]
  },
  venue: {
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
    address: {
      street: String,
      zip: String,
      city: String
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dateTime: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  price: {
    min: {
      type: Number,
      min: 0,
      default: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'EUR'
    },
    isFree: {
      type: Boolean,
      default: false
    }
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  organizer: {
    name: {
      type: String,
      required: true
    },
    contact: {
      email: String,
      phone: String,
      website: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  links: {
    website: String,
    tickets: String,
    facebook: String,
    instagram: String
  },
  tags: [String],
  capacity: {
    type: Number,
    min: 0
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ city: 1, 'dateTime.start': 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ tags: 1 });

// Virtual for average rating
eventSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

// Virtual for attendee count
eventSchema.virtual('attendeeCount').get(function() {
  return this.attendees.length;
});

// Check if event is in the future
eventSchema.virtual('isUpcoming').get(function() {
  return this.dateTime.start > new Date();
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
