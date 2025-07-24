import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    // Authenticated User ID (Creator)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },

    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Only 10 digits
        },
        message: (props) => `${props.value} is not a valid 10-digit mobile number.`,
      },
    },

    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },

    homeDistrict: {
      type: String,
      required: [true, 'Home district is required'],
      trim: true,
    },

    constituency: {
      type: String,
      trim: true,
    },

    isScheduled: {
      type: String,
      enum: ['scheduled', 'notScheduled', 'completed'],
      default: 'notScheduled',
    },

    metBefore: {
      type: Boolean,
      default: false,
    },

    reference: {
      type: String,
      trim: true,
    },

    politicalExperience: {
      type: Boolean,
      default: false,
    },

    reason: {
      type: String,
      trim: true,
    },

    occupation: {
      type: String,
      trim: true,
    },

    janSuraajMember: {
      type: Boolean,
      default: false,
    },

    janSuraajWorker: {
      type: Boolean,
      default: false,
    },

    electionHistory: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },

    politicalAffiliation: {
      type: Boolean,
      default: false,
    },

    willBeAccompanied: {
      type: Boolean,
      default: false,
    },

    accompanyingPersons: {
      type: [String],
      default: [],
    },

    priorityTag: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'low',
    },

    arrivalDate: {
      type: Date,
    },

    arrivalTime: {
      type: String,
      validate: {
        validator: function (v) {
          // Matches HH:mm (24-hr format)
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: (props) => `${props.value} is not a valid time (HH:mm format)!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Export as 'Meeting' collection
export default mongoose.model('Meeting', meetingSchema);
