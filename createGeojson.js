const geojsonStream = require("geojson-stream");
const fs = require("fs");
const GeoJSON = require("mongoose-geojson-schema");
const mongoose = require("mongoose");
const turf = require("@turf/turf");
// const { createModel } = require('mongoose-gridfs');

// const Attachment = createModel();

const e = 100000;

// const out = fs.createWriteStream("./layers/gadm36_levels_gpkg/33.geojson");
// fs.createReadStream("./layers/gadm36_levels_gpkg/3.geojson")
//   .pipe(
//     geojsonStream.parse((f, index) => {
//       // if (f.geometry.coordinates === null) {
//       //   return null;
//       // }
//       f.fid = e + index;
//       f.properties.fid = e + index;
//       return f;
//     })
//   )
//   .pipe(geojsonStream.stringify())
//   .pipe(out);

fs.createReadStream(`./layers/gadm36_levels_gpkg/33.geojson`).pipe(
  geojsonStream.parse((f, index) => {
    console.log(f.properties.fid);
  })
);
