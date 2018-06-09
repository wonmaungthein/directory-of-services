import fs from 'fs';
import postLatLongData from './latLongBeforeFilter.json';

// I used this website live API: https://api.postcodes.io/, it allow to get lat and
// long for 100 postcode in an array


function getPostcodes(data) {
  return data.map(orgs => orgs.branches)
    .map(item => item[0].Postcode)
    .filter((elem, index, self) => index === self.indexOf(elem) && elem.length > 0)
}

function filterPostcodeLatLong() {
  return postLatLongData.map(data => {
    if (data.result) {
      const lat = data.result.latitude
      const long = data.result.longitude
      const Postcode = data.result.postcode
      return { Postcode, lat, long }
    }
    const Postcode = data.query
    return { Postcode, lat: '', long: '' }
  })
}

function addLatLong(realData) {
  return realData.map(orgs =>
    orgs.branches.map(org => {
      const {
        Area, Organisation, Clients, Category, Email, project, tag, Website,
        Tel, Process, Postcode, Services, Borough, Day
      } = org;
      for (let post in latLong) {
        if (org.Postcode === latLong[post].Postcode) {
          const { lat } = latLong[post];
          const { long } = latLong[post];
          return {
            Area,
            Organisation,
            Clients,
            Category,
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
            long
          }
        }
      }
      return {
        Area,
        Organisation,
        Clients,
        Category,
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
        long: ''
      }
    }))
}

function orgStructure(organisations) {
  let newOrgs = [];
  let data = [];
  organisations
    .map(orgs =>
      orgs.map(item => {
        if (!newOrgs.includes(item.Organisation)) {
          newOrgs.push(item.Organisation);

          let temp = {};
          temp.name = item.Organisation;
          temp.count = 1;
          temp.branches = [];
          temp.branches.push(item);

          data.push(temp);
        } else {
          data.map((elem, index) => {
            if (elem.name === item.Organisation) {
              elem.count += 1;

              data[index].branches.push(item);
            }
          });
        }
      }))
  return data;
}

function convertToJsonFile(data, fileName) {
  const stringData = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${fileName}.json`, stringData);
}
