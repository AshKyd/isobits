/**
 * @file
 * Read a directory and index all the SVG files in the tree
 */
import fs from "fs";
import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

function readDir(dir) {
  const items = {
    files: [],
  };
  const listing = fs.readdirSync(dir).filter((entry) => !entry.match(/^\./));
  listing.forEach((file) => {
    const fullPath = path.resolve(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      items[path.basename(file)] = readDir(fullPath);
    } else if (file.match(/\.svg$/)) {
      items.files.push(path.basename(file));
    }
  });
  return items;
}

const index = readDir(path.resolve(__dirname, "../sprites"));
console.log(JSON.stringify(index, null, 2));
