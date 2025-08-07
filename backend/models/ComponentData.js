const mongoose = require("mongoose");

const ComponentDataSchema = new mongoose.Schema(
  {
    header: {
      title: String,
      image: String,
    },
    navbar: [
      {
        label: String,
        url: String,
      },
    ],
    footer: {
      email: String,
      phone: String,
      address: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComponentData", ComponentDataSchema);
