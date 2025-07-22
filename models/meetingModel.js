import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    homeDistrict: {
      type: String,
      required: true,
    },
    constituency: {
      type: String,
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    metBefore: {
      type: Boolean,
      default: false,
    },
    reference: {
      type: String,
    },
    politicalExperience: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
    },
    occupation: {
      type: String,
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
      type: String, // Store as "HH:mm" format
      validate: {
        validator: function (v) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: props => `${props.value} is not a valid time!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Meeting', meetingSchema);
