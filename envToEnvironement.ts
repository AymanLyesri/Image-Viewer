// import { writeFile } from "fs";
const { writeFile } = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = "./src/environments/environment.final.ts";
// Load node modules

require("dotenv").config();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: true,
  URL: "${process.env["URL"]}",
  NAME: "${process.env["NAME"]}",
  FAVICON: "${process.env["FAVICON"]}",
  HELPICON: "${process.env["HELPICON"]}",
  HELPURL: "${process.env["HELPURL"]}",
  COUNTKEY: "${process.env["COUNTKEY"]}",
  SITEDESCRIPTION: "${process.env["SITEDESCRIPTION"]}",
  IMAGEPREVIEWLINK:"${process.env["IMAGEPREVIEWLINK"]}",
  SITELINK: "${process.env["SITELINK"]}",
  TITLE: "${process.env["TITLE"]}",
  DONATIONINTRO: "${process.env["DONATIONINTRO"]}",
  PATREONLINK: "${process.env["PATREONLINK"]}"
};
`;
console.log(
  "The file `environment.ts` will be written with the following content: \n"
);
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, function ()
{


  console.log(
    `Angular environment.ts file generated correctly at ${targetPath} \n`
  );

});
