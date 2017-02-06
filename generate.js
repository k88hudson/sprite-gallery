const fs = require("fs");
const sizeOf = require("image-size");
const path = require("path");
const IMAGES_DIR = "./images";
const MAGNIFY = 4;

fs.readdir(IMAGES_DIR, (err, files) => {
  const imageHTML = files.filter(file => file.match(/\.gif$/)).map(filename => {
    const dimensions = sizeOf(path.join(IMAGES_DIR, filename));
    return `    <img width=${dimensions.width * MAGNIFY} height=${dimensions.height * MAGNIFY} src="${IMAGES_DIR}/${filename}" />`;
  });
  console.log(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sprites</title>
    <style>
      img {
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
      }
    </style>
  </head>
  <body>
${imageHTML.join("\n")}
  </body>
</html>\n`);
});
