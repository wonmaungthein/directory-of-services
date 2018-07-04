# How to run the script

- npm start

- npm start runs both data.js and addLatlong.js

# Converting the spreadsheet data to JSON format

- We use the file data.js in our script folder to convert the spreadsheet data to JSON format.
- The `getData` function takes list of categories and a url of the spreadsheet and fetch each category and returns all categories in JSON format.
- The `writeData` function then takes the categories data and removes the duplicated organisations and the `arrayFlattener` function changes the data to be flat JSON, remove empty valued organisation and underscore from the array.
- The `addNewKeyValue` function then adds the project and tag keys to the JSON data.
- Finally we take the returned value of `addNewKeyValue` function and write the data to organisation.json file.

# Add latitude and longtude keys to organisation.json

- We use the file addLatLong.js in our script folder to convert the the return data from data.js to the final JSON format.
- converToJsonFile function takes data and filename and create a file in json format.
- `getPostcodes` function takes organisation.json file and returns array of postcodes
- `getOrgsLatAndLong` function takes array of postcodes and a url of postcodes.io,then make a fetch request for each postcode and returns array of (postcode,lon,lat ) objects.
- `addLatlong` function takes organisation.json data and the returnvalue of `getOrgsLatAndLong` function,then reurns array of organisations which have lat and long data.
- `convertToBranchesStructure` function takes the return value of addLatlong function and convert the data structure to the final usable format.
- `finalResult` function calls all the top functions and generate the new data.
