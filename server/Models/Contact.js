const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contacts: [
    {
      email: {
        type: String,
      },
      name: String,
    },
  ],
});

module.exports = mongoose.model("Contact", contactSchema);
