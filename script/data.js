const fetch = require("node-fetch");
const fs = require("fs");

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
        console.error(`What happened`, {
          error: err
        });
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writedata() {
  const readData = await getData();
  // console.log(readData[1]);

  ("use strict");

  let data = JSON.stringify(readData, null, 2);

  fs.writeFile("writtenData.json", data, err => {
    if (err) throw err;
    console.log("Data written to file");
  });

  console.log("This is after the write call");
}
writedata();
