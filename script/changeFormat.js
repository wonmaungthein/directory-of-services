const fs = require("fs");
const organisations = require("./organisations.json");

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
    data.map(function(elem, index) {
      if (elem.name === item.Organisation) {
        elem.count += 1;

        data[index].branches.push(item);
      }
    });
  }
});

let stringData = JSON.stringify(data, null, 2);
fs.writeFileSync("formattedOrgs.json", stringData);
console.log(data[0]);
