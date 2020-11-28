const geojsonStream = require("geojson-stream");
const fs = require("fs");
const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const turf = require("@turf/turf");
// const { createModel } = require('mongoose-gridfs');

// const Attachment = createModel();

const geoSchemaBbox = new mongoose.Schema({
  fid: { type: String, unique: true },
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.Polygon
});
const geoSchema = new mongoose.Schema({
  fid: { type: String, unique: true },
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.MultiPolygon
});

const GeoModelBboxFid = mongoose.model("GeoJSONBboxFid", geoSchemaBbox);
const GeoModelFid = mongoose.model("GeoJSONFid", geoSchema);

mongoose.connect("mongodb://emad:mohesem1368@localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");

  //   fs.createReadStream(`./layers/gadm36_levels_gpkg/0.geojson`).pipe(
  fs.createReadStream(`./layers/1.geojson`).pipe(
    geojsonStream.parse((f, index) => {
      console.log(index);
      const p = f.properties;
      console.log(p);
      //   GeoModelBboxFid.findOne(
      //     {
      //       fid: p.fid
      //     },
      //     (err, doc) => {
      //       if (err) return err;
      //       if (doc) {
      //         console.log("doc exist on db ");
      //       }
      //       if (!doc) {
      //         const newCoord = turf.cleanCoords(f).geometry.coordinates;
      //         const multiPoly = turf.multiPolygon(newCoord, {
      //           name: p.NAME_2
      //         });
      //         const bbox = turf.bbox(multiPoly);
      //         const bboxPolygon = turf.bboxPolygon(bbox);
      //         const newGeoModelBbox = new GeoModelBboxFid({
      //           fid: p.fid,
      //           name0: p.NAME_0,
      //           name1: p.NAME_1,
      //           name1: p.NAME_2,
      //           geo: bboxPolygon.geometry
      //         });

      //         const newGeoModel = new GeoModelFid({
      //           fid: p.fid,
      //           name0: p.NAME_0,
      //           name1: p.NAME_1,
      //           name1: p.NAME_2,
      //           geo: multiPoly.geometry
      //         });

      //         newGeoModelBbox.save(err => {
      //           if (err) console.log(err);
      //           console.log(
      //             `${p.NAME_2} in ${p.NAME_1} in ${p.NAME_0} bbox saved`
      //           );
      //         });

      //         newGeoModel.save(err => {
      //           if (err) {
      //             const options = { tolerance: 0.003, highQuality: true };
      //             const simplified = turf.simplify(multiPoly, options);
      //             const simplifiedModel = new GeoModelFid({
      //               fid: p.fid,
      //               name0: p.NAME_0,
      //               name1: p.NAME_1,
      //               name1: p.NAME_2,
      //               geo: simplified.geometry
      //             });
      //             simplifiedModel.save();
      //           }
      //           console.log(
      //             `${p.NAME_2} in ${p.NAME_1} in ${p.NAME_0} bbox saved`
      //           );
      //         });
      //       }
      //     }
      //   );
    })
  );
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

mongoose.connection.on("error", err => {
  console.error(`MongoDB error: ${err}`);
});
