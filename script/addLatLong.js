const fs = require("fs");
const fetch = require('node-fetch');
const organisations = require("./updatedOrganisations.json");
const postcodes = require('./postcodes.json');

// Write the data into file as JSON format
function convertToJsonFile(data, fileName) {
  const stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${fileName}.json`, stringData);
}

// Get postcodes from original data
function getPostcodes(data) {
  const posts = [];
  data.map(orgs => posts.push(orgs.Postcode.replace(/[' ']/g, '')));
  const filteredPost = posts.filter((elem, index, self) => index === self.indexOf(elem) && elem)
  return filteredPost;
}

convertToJsonFile(getPostcodes(organisations), 'test')
// Get postcode lat and long using external API with fetch function
async function getOrgsLatAndLog(postcodes) {
  try {
    const response = await Promise.all(
      postcodes.map(post =>
        fetch(`https://api.postcodes.io/postcodes/?q=${post}`, { mode: 'no-cros' })
          .then(resp => resp.json())
      )
    );
    const data = await response.map(res => {
      const lat = res.result ? res.result[0].latitude : '';
      const long = res.result ? res.result[0].longitude : '';
      const Postcode = res.result ? res.result[0].postcode : '';
      return { Postcode, lat, long };
    })
    const newData = await data.filter(res => res.Postcode !== '');
    return newData;
  } catch (err) {
    console.error(err);
    return err;
  }
}

// Add lat and long to organisation
function addLatLong(organisations, latLong) {
  return organisations.map(org => {
    const {
      Area, Organisation, Clients, categories, Email, project, tag, Website,
      Tel, Process, Postcode, Services, Borough, Day, Address
    } = org;
    for (const post in latLong) {
      const orgPostcode = org.Postcode.replace(/[' ']/g, '');
      const postPotcode = latLong[post].Postcode.replace(/[' ']/g, '');
      if (orgPostcode.includes(postPotcode)) {
        const { lat } = latLong[post];
        const { long } = latLong[post];
        return {
          Area,
          Organisation,
          Clients,
          categories,
          Email,
          project,
          tag,
          Website,
          Tel,
          Process,
          Postcode,
          Services,
          Borough,
          Day,
          lat,
          long,
          Address
        }
      }
    }
    return {
      Area,
      Organisation,
      Clients,
      categories,
      Email,
      project,
      tag,
      Website,
      Tel,
      Process,
      Postcode,
      Services,
      Borough,
      Day,
      lat: '',
      long: '',
      Address
    }
  })
}

// Conver data that you added lat and long to, to original data stucture.
function convertToBranchesStructure(organisations) {
  let newOrgs = [];
  let data = [];
  organisations.map(item => {
    if (!newOrgs.includes(item.Organisation)) {
      newOrgs.push(item.Organisation);

      let temp = {};
      temp.name = item.Organisation;
      temp.count = 1;
      temp.branches = [];
      temp.branches.push(item);

      data.push(temp);
    } else {
      data.map(function (elem, index) {
        if (elem.name === item.Organisation) {
          elem.count += 1;

          data[index].branches.push(item);
        }
      });
    }
  });
  return data;
}

// Compile all functions together to get final result
async function finalResult() {
  const data = await getOrgsLatAndLog(postcodes);
  const orgs = await addLatLong(organisations, data);
  convertToJsonFile(convertToBranchesStructure(orgs), 'newData')
}

finalResult();