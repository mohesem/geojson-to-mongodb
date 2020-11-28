//  Yên Bình
// Văn Chấn

const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.MultiPolygon,
  fid: { type: Number, required: true, unique: true }
});

geoSchema.index({ geo: "2dsphere" });

const GeoModel = mongoose.model("GeoJSON", geoSchema);

mongoose.connect("mongodb://localhost:27017/fansclub", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
  GeoModel.find({ name2: "Yên Bình" }, (err, docs) => {
    if (err) throw err;
    console.log(docs);
    docs.forEach(doc => {
      console.log(doc.geo.coordinates[0][0].length);
    });
  });
});
