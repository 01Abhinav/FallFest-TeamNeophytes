import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Hospital = new Schema({
  name: { type: String },
  reg_no: { type: String },
  password: { type: String },
  beds: { type: int },
  ventillator: { type: int },
  surgeon: { type: int },
  cardiologists: { type: int },
  psychologist: { type: int },
  orthologist: { type: int },
  gynaecologist: { type: int },
  oncologist: { type: int },
});
export default mongoose.model("books", Hospital);
