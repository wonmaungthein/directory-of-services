const fetch = require("node-fetch");
const fs = require("fs");
const fetchedData = require("./fetchedDataFromSpreadsheet.json");
("use strict");

/*
At the moment since the URL below has broken,we used the old
data (fetchedDataFromSpreadsheet.json) which is fetched from the same URL.

const gDriveURL =
  "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=150tJxB_4MwKG1EqD1EGbFibIsN_E5LAzUh-r4Bqvq8o&sheet=";
const categories = [
  "Debt",
  "Immigration",
  "Housing",
  "Trafficking",
  "Destitution/NRPF",
  "LGBTQI",
  "Healthcare",
  "Education",
  "Benefits",
  "Employment/Training/Volunteering",
  "Families",
  "Gender Based Violence",
  "Mental Health Services",
  "Social and Other",
  "Women",
  "Pregnant Women and New Mothers",
  "Baby Equipment",
  "Young People/Children"
];

async function getData() {
  try {
    return await Promise.all(
      categories.map(category =>
        fetch(`${gDriveURL}${category}`).then(resp => resp.json())
      )
    )
      .then(data => data)
      .catch(err => {
        console.error(`error`, {
          error: err
        });
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
*/
async function writedata() {
  const readData = fetchedData;
  const filteredArray = [];
  const [
    Debt,
    Immigration,
    Housing,
    Trafficking,
    Destitution,
    LGBTQI,
    Healthcare,
    Education,
    Benefits,
    EmploymentTrainingVolunteering,
    Families,
    GenderBasedViolence,
    MentalHealthServices,
    SocialAndOther,
    Women,
    PregnantWomenAndNewMothers,
    BabyEquipment,
    YoungPeopleChildren
  ] = readData;
  function removeDuplication(data) {
    for (let key in data) {
      filteredArray.push(
        data[key]
          .map(el => {
            var o = Object.assign({}, el);
            o.categories = key;
            return o;
          })
          .filter(
            (elem, index, self) =>
              index ===
              self.findIndex(
                toDo =>
                  toDo.Organisation === elem.Organisation &&
                  toDo.Area === elem.Area &&
                  toDo.Borough === elem.Borough
              )
          )
      );
    }
  }
  const arr = [
    Debt,
    Immigration,
    Housing,
    Trafficking,
    Destitution,
    LGBTQI,
    Healthcare,
    Education,
    Benefits,
    EmploymentTrainingVolunteering,
    Families,
    GenderBasedViolence,
    MentalHealthServices,
    SocialAndOther,
    Women,
    PregnantWomenAndNewMothers,
    BabyEquipment,
    YoungPeopleChildren
  ].map(item => removeDuplication(item));

  // replace the underscores in each of the objects
  function replaceKeys(obj, find, replace) {
    return Object.keys(obj).reduce(
      (acc, key) => Object.assign(acc, { [key.replace(find, replace)]: obj[key] }),{});
  }

  function arrayFlattenner() {
    return filteredArray
      .reduce((acc, val) => acc.concat(val), [])
      .filter(function(el) {
        return el.Organisation !== "";
      })
      .map(obj => replaceKeys(obj, /_/g, ""));
  }

  function addNewKeyValue() {
    return arrayFlattenner().map(el => {
      var o = Object.assign({}, el);
      o.project = "";
      o.tag = "";
      return o;
    });
  }

  return addNewKeyValue();
}

module.exports.writedata = writedata;
