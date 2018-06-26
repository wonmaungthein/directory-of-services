# Converting the spreadsheet data to JSON format

- We use the file data.js in our script folder to convert the spreadsheet data to JSON format.
- The `getData` function takes list of categories and a url of the spreadsheet and fetch each category and returns all categories in JSON format.
- The `writeData` function then takes the categories data and removes the duplicated organisations and the `arrayFlattener` function changes the data to be flat JSON, remove empty valued organisation and underscore from the array.
- The `addNewKeyValue` function then adds the project and tag keys to the JSON data.
- Finally we take the returned value of `addNewKeyValue` function and write the data to organisation.json file.

# Add latitude and longtude keys to organisation.json

- converToJsonFile function takes data and filename and create a file in json format.
- `getPostcodes` function takes organisation.json file and returns array of postcodes
- `getOrgsLatAndLong` function takes array of postcodes and a url of postcodes.io,then make a fetch request for each postcode and returns array of (postcode,lon,lat ) objects.
- `addLatlong` function takes organisation.json data and the returnvalue of `getOrgsLatAndLong` function,then reurns array of organisations which have lat and long data.
- `convertToBranchesStructure` function takes the return value of addLatlong function and convert the data structure to the final usable format.
- `finalResult` function calls all the top functions and generate the new data.

# Postcode issues

- The array of postcodes which are generated from getPostcodes function have some invalid postcodes(for example: “london”, “various locations”). This issue is coming from the original data from the spreadsheet.

# How to run the scripts

- use npm start to run `data.js` to get the flattened array of objects which is going to be written in the `updatedOrganisations.json`.
- After getting `updatedOrganisations.json` call convertToJsonFile(getPostcodes(organisations), 'postcodes') function at end addLatLong.js file then run node addLatLong.js to get postcodes, then run run node addLatLong.js again to get the final usable JSON format in the `newDta.json` file which we can migrate it to our database.
