const geojsonStream = require("geojson-stream");
const fs = require("fs");
const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const turf = require("@turf/turf");
// const { createModel } = require('mongoose-gridfs');

// const Attachment = createModel();

const geoSchemaBbox = new mongoose.Schema({
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.Polygon
});
const geoSchema = new mongoose.Schema({
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.MultiPolygon
});

const GeoModelBbox = mongoose.model("GeoJSONBbox", geoSchemaBbox);
const GeoModel = mongoose.model("GeoJSON", geoSchema);

mongoose.connect("mongodb://emad:mohesem1368@localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");

  fs.createReadStream(`./layers/1.geojson`).pipe(
    //   /* COUNTRIES */
    //   geojsonStream.parse((country, index) => {
    //     GeoModelBbox.findOne({ name0: country.properties.NAME_0 }, (err, doc) => {
    //       if (err) return err;
    //       if (doc) {
    //         console.log("doc exist on db ");
    //       }
    //       if (!doc) {
    //         const newCoord = turf.cleanCoords(country).geometry.coordinates;
    //         const multiPoly = turf.multiPolygon(newCoord, {
    //           name: country.properties.NAME_0
    //         });
    //         const bbox = turf.bbox(multiPoly);
    //         const bboxPolygon = turf.bboxPolygon(bbox);
    //         const newGeoModelBbox = new GeoModelBbox({
    //           name0: multiPoly.properties.name,
    //           geo: bboxPolygon.geometry
    //         });

    //         const newGeoModel = new GeoModel({
    //           name0: multiPoly.properties.name,
    //           geo: multiPoly.geometry
    //         });

    //         newGeoModelBbox.save(err => {
    //           if (err) console.log(err);
    //           console.log(`${country.properties.NAME_0} bbox saved`);
    //         });

    //         newGeoModel.save(err => {
    //           if (err) {
    //             const options = { tolerance: 0.003, highQuality: true };
    //             const simplified = turf.simplify(multiPoly, options);
    //             const simplifiedModel = new GeoModel({
    //               name0: multiPoly.properties.name,
    //               geo: simplified.geometry
    //             });
    //             simplifiedModel.save();
    //           }
    //           console.log(`${country.properties.NAME_0} polygon saved`);
    //         });
    //       }
    //     });
    //   })



    
    /* LEVEL_1 */
    // geojsonStream.parse((level_1, index) => {
    //   GeoModelBbox.findOne(
    //     {
    //       $and: [
    //         { name0: level_1.properties.NAME_0 },
    //         { name1: level_1.properties.NAME_1 }
    //       ]
    //     },
    //     (err, doc) => {
    //       if (err) return err;
    //       if (doc) {
    //         console.log("doc exist on db ");
    //       }
    //       if (!doc) {
    //         const newCoord = turf.cleanCoords(level_1).geometry.coordinates;
    //         const multiPoly = turf.multiPolygon(newCoord, {
    //           name: level_1.properties.NAME_0
    //         });
    //         const bbox = turf.bbox(multiPoly);
    //         const bboxPolygon = turf.bboxPolygon(bbox);
    //         const newGeoModelBbox = new GeoModelBbox({
    //           name0: level_1.properties.NAME_0,
    //           name1: level_1.properties.NAME_1,
    //           geo: bboxPolygon.geometry
    //         });

    //         const newGeoModel = new GeoModel({
    //           name0: level_1.properties.NAME_0,
    //           name1: level_1.properties.NAME_1,
    //           geo: multiPoly.geometry
    //         });

    //         newGeoModelBbox.save(err => {
    //           if (err) console.log(err);
    //           console.log(`${level_1.properties.NAME_1} in ${level_1.properties.NAME_0} bbox saved`);
    //         });

    //         newGeoModel.save(err => {
    //           if (err) {
    //             const options = { tolerance: 0.003, highQuality: true };
    //             const simplified = turf.simplify(multiPoly, options);
    //             const simplifiedModel = new GeoModel({
    //               name0: level_1.properties.NAME_0,
    //               name1: level_1.properties.NAME_1,
    //               geo: simplified.geometry
    //             });
    //             simplifiedModel.save();
    //           }
    //           console.log(`${level_1.properties.NAME_1} in ${level_1.properties.NAME_0} polygon saved`);
    //         });
    //       }
    //     }
    //   );
    // })
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
