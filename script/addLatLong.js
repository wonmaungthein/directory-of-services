const fs = require("fs");
const fetch = require('node-fetch');
const finalData = require("./data.js")
const PCodeRegEx = RegExp('([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})');

// Write the data into file as JSON format
function convertToJsonFile(data, fileName) {
  const stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${fileName}.json`, stringData);
}

// Get postcodes from original data
async function getPostcodes() {
  const posts = [];
  finalData.map(orgs => posts.push(orgs.Postcode.replace(/[' ']/g, "")));
  const filteredPost = posts.filter((elem, index, self) => index === self.indexOf(elem) && elem)
  const postcodeData = filteredPost.filter(postcode => postcode.match(PCodeRegEx))
  const cleanPostCode = postcodeData.map(postcode => postcode.replace(/[\r\n]/g, ''))
  return cleanPostCode;
}

// Get lat and long from the postcode using external API with fetch function
async function getOrgsLatAndLog() {
  const postcodes = await getPostcodes();
  // console.log('postcode', postcodes)
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
function addLatLong(orgWithNOLatLong, latLong) {
  return orgWithNOLatLong.map(org => {
    const {
      Area, Organisation, Clients, Categories, Email, Project, Tag, Website,
      Tel, Process, Postcode, Services, Borough, Days, Address
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
          Categories,
          Email,
          Project,
          Tag,
          Website,
          Tel,
          Process,
          Postcode,
          Services,
          Borough,
          Days,
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
      Categories,
      Email,
      Project,
      Tag,
      Website,
      Tel,
      Process,
      Postcode,
      Services,
      Borough,
      Days,
      lat: '',
      long: '',
      Address
    }
  })
}

// Conver data that you added lat and long to, to original data stucture.
function convertToBranchesStructure(orgWithNOLatLong) {
  let newOrgs = [];
  let data = [];
  orgWithNOLatLong.map(item => {
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
  const data = await getOrgsLatAndLog();
  const orgs = await addLatLong(finalData, data);
  return convertToJsonFile(convertToBranchesStructure(orgs), 'newData')
}

finalResult();

