const geojsonStream = require("geojson-stream");
const fs = require("fs");
const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const turf = require("@turf/turf");

const geoSchema = new mongoose.Schema({
  name0: { type: String },
  name1: { type: String },
  name2: { type: String },
  geo: mongoose.Schema.Types.MultiPolygon,
  lvl: { type: Number },
  fid: { type: String, required: true, unique: true },
});

geoSchema.index({ geo: "2dsphere" });

const GeoModel = mongoose.model("GeoJSON", geoSchema);

mongoose.connect("mongodb://localhost:27017/fansclub2", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");

  fs.createReadStream(`./data/1.geojson`).pipe(
    geojsonStream.parse(async (f, index) => {
      // console.log(f, index);

      const props = f.properties;
      // console.log(props);
      const newCoord = await turf.cleanCoords(f).geometry.coordinates;
      const multiPoly = turf.multiPolygon(newCoord, {});
      const newGeoModel = new GeoModel({
        name0: props.NAME_0,
        name1: props.NAME_1,
        name2: props.NAME_2,
        geo: multiPoly.geometry,
        lvl: 1,
        fid: "b" + props.fid,
      });

      newGeoModel.save((err) => {
        if (!err)
          console.log(
            `${props.NAME_2} in ${props.NAME_1} in ${props.NAME_0} saved`
          );

        if (err) {
          console.log("simplifying geometry");
          const options = { tolerance: 0.003, highQuality: true };
          const simplified = turf.simplify(multiPoly.geometry, options);
          const simplifiedModel = new GeoModel({
            name0: props.NAME_0,
            name1: props.NAME_1,
            name2: props.NAME_2,
            geo: simplified.geometry,
            lvl: 1,
            fid: "b" + props.fid,
          });
          simplifiedModel.save((error) => {
            if (error)
              return console.log(
                `**** error on saving ${props.NAME_2} in ${props.NAME_1} in ${props.NAME_0} the actual error ==>`
              );
            console.log(
              `${props.NAME_2} in ${props.NAME_1} in ${props.NAME_0} saved`
            );
          });
        }
      });
    })
  );
});

// GeoModel.findOne({ fid: f.fid }, (err, doc) => {
//   if (err) return console.log(err);
//   if (doc) return console.log("fouuuund", index);
//   // if (!doc.length) console.log("found boundary but it is empty !!!!!");
//   const newCoord = turf.cleanCoords(f).geometry.coordinates;
//   const multiPoly = turf.multiPolygon(newCoord, {});
//   const newGeoModel = new GeoModel({
//     name0: f.properties.NAME_0,
//     name1: f.properties.NAME_1,
//     name2: f.properties.NAME_2,
//     geo: multiPoly.geometry,
//     fid: f.fid
//   });

//   newGeoModel.save(err => {
//     if (!err)
//       console.log(
//         `${f.properties.NAME_2} in ${f.properties.NAME_1} in ${f.properties.NAME_0} saved`
//       );

//     if (err) {
//       console.log("simplifying geometry");
//       const options = { tolerance: 0.003, highQuality: true };
//       const simplified = turf.simplify(multiPoly.geometry, options);
//       const simplifiedModel = new GeoModel({
//         name0: f.properties.NAME_0,
//         name1: f.properties.NAME_1,
//         name2: f.properties.NAME_2,
//         geo: simplified.geometry,
//         fid: f.fid
//       });
//       simplifiedModel.save(error => {
//         if (error)
//           return console.log(
//             `**** error on saving ${f.properties.NAME_2} in ${f.properties.NAME_1} in ${f.properties.NAME_0} the actual error ==>`
//           );
//         console.log(
//           `${f.properties.NAME_2} in ${f.properties.NAME_1} in ${f.properties.NAME_0} saved`
//         );
//       });
//     }
//   });
// });

// GeoModelBbox.findOne(
//     {
//       $and: [
//         { name0: f.properties.NAME_0 },
//         { name1: f.properties.NAME_1 },
//         { name2: f.properties.NAME_2 }
//       ]
//     },
//     (err, doc) => {
//       if (err) return err;
//       if (doc) {
//         console.log("doc exist on db ");
//       }
//       if (!doc) {
//         const newCoord = turf.cleanCoords(f).geometry.coordinates;
//         const multiPoly = turf.multiPolygon(newCoord, {
//           name: f.properties.NAME_2
//         });
//         const bbox = turf.bbox(multiPoly);
//         const bboxPolygon = turf.bboxPolygon(bbox);
//         const newGeoModelBbox = new GeoModelBbox({
//           name0: f.properties.NAME_0,
//           name1: f.properties.NAME_1,
//           name1: f.properties.NAME_2,
//           geo: bboxPolygon.geometry
//         });

//         const newGeoModel = new GeoModel({
//           name0: f.properties.NAME_0,
//           name1: f.properties.NAME_1,
//           name1: f.properties.NAME_2,
//           geo: multiPoly.geometry
//         });

//         newGeoModelBbox.save(err => {
//           if (err) console.log(err);
//           console.log(
//             `${f.properties.NAME_2} in ${f.properties.NAME_1} in ${f.properties.NAME_0} bbox saved`
//           );
//         });

//         newGeoModel.save(err => {
//           if (err) {
//             const options = { tolerance: 0.003, highQuality: true };
//             const simplified = turf.simplify(multiPoly, options);
//             const simplifiedModel = new GeoModel({
//               name0: f.properties.NAME_0,
//               name1: f.properties.NAME_1,
//               name1: f.properties.NAME_2,
//               geo: simplified.geometry
//             });
//             simplifiedModel.save();
//           }
//           console.log(
//             `${f.properties.NAME_2} in ${f.properties.NAME_1} in ${f.properties.NAME_0} bbox saved`
//           );
//         });
//       }
//     }
//   );

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB error: ${err}`);
});
