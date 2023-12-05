import mongoose from "mongoose";

const subGroupSchema = new mongoose.Schema({
  name: String,
});

const sectorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  subGroups: [subGroupSchema],
});


const Selector = mongoose.model("Selector", sectorSchema);

export default Selector;
