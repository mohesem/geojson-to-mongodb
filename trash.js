
// const geojsonStream = require("geojson-stream");
// const fs = require("fs");
// var GeoJSON = require("mongoose-geojson-schema");
// const mongoose = require("mongoose");
// const turf = require("@turf/turf");
// // const { createModel } = require('mongoose-gridfs');

// // const Attachment = createModel();

// const geoSchema = new mongoose.Schema({
//   name: { type: String, unique: true },
//   geo: mongoose.Schema.Types.MultiPolygon
// });

// const GeoModel = mongoose.model("GeoJSON", geoSchema);

// mongoose.connect("mongodb://emad:mohesem1368@localhost:27017/test", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected");

//   fs.createReadStream(`./level03.geojson`).pipe(
//     geojsonStream.parse((country, index) => {
//       console.log(country.properties.NAME_0);
//       const newCoord = turf.cleanCoords(country).geometry.coordinates;
//       // console.log(newCoord)

//       var multiPoly = turf.multiPolygon(newCoord, {
//         name: country.properties.NAME_0
//       });

//       // var multiPoly = turf.multiPolygon(newCoord, {
//       //   name: country.properties.NAME_0
//       // });

//       // var options = { tolerance: 0.003, highQuality: true };
//       // var simplified = turf.simplify(multiPoly, options);

//       GeoModel.findOne({ name: country.properties.NAME_0 }, (err, doc) => {
//         if (err) return err;
//         if (doc) {
//           console.log("doc exist on db ");
//         }
//         if (!doc) {
//           const newGeo = new GeoModel({
//             name: country.properties.NAME_0,
//             geo: newCoord
//           });
//           newGeo.save(err => {
//             if (err) console.log(err);
//           });
//         }
//       });
//     })
//   );

//   // const City = mongoose.model(
//   //   "City",
//   //   new mongoose.Schema({
//   //     name: String,
//   //     location: mongoose.Schema.Types.Point
//   //   })
//   // );

//   /* City.create({ name: 'Denver', location: denver }).
//   then(() => */

//   // GeoModel.find(
//   //   {
//   //     geo: {
//   //       $geoIntersects: {
//   //         $geometry: {
//   //           type: "Point",
//   //           coordinates: [40, 13]
//   //         }
//   //       }
//   //     }
//   //   },
//   //   (err, data) => {
//   //     if (err) console.log(err);
//   //     console.log(data);
//   //   }
//   // );
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

// mongoose.connection.on("reconnected", () => {
//   console.log("MongoDB reconnected");
// });

// mongoose.connection.on("error", err => {
//   console.error(`MongoDB error: ${err}`);
// });
