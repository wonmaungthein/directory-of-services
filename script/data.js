const fetch = require("node-fetch");
const fs = require("fs");
const fetchedData = require("./fetchedDataFromSpreadsheet.json");
("use strict");

// convert the data to json format and save it into new file
function convertToJsonFile(data, fileName) {
const stringData = JSON.stringify(data, null, 2);
fs.writeFileSync(`${fileName}.json`, stringData);
}

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

async function fetchedData() {
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

// Flat data fetched (fetchedData) from spreadsheet, add tag, categorie and projet fields 
// Make day field consistent 
const flat = () => {
    return fetchedData.map((item, index) => {
          for (let cat in item) {
            return item[cat].map(el => {
                  for (let orgFields in el) {
                    // Make sure key for day fiels is Days for every org 
                    if (orgFields === 'Day') {
                      el.Days = el[orgFields];
                      delete el[orgFields]                      
                    } else if (orgFields === 'Telephone') {
                      el.Tel = el[orgFields];
                      delete el[orgFields]
                    } else if (orgFields === '_Organisation') {
                      el.Organisation = el[orgFields];
                      delete el[orgFields]
                    }
                  }
// Add new key field to every org 
// arr.push(el)
el.Project = "";
el.Tag = "";
el.Categories = cat;
return el;
})
}
})
}

const flattenedData = flat();

const finalData = flattenedData.map(categoryData => {
    // create new array contain single category data
    const allData = [];

    // Get duplicated organizations for single category
    const dulicatedOrgs = []; 
    // Get unduplicated organizations for single category
    const unduplicatedOrgs = [];

    for (let i = 0; i < categoryData.length; i++) {
        allData.push(categoryData[i])
        const orgNum =  categoryData.filter(item => item.Organisation.toLowerCase() === categoryData[i].Organisation.toLowerCase() && item.Borough.toLowerCase() === categoryData[i].Borough.toLowerCase()).length;
        if (allData[i].Organisation.toLowerCase() === categoryData[i].Organisation.toLowerCase() && allData[i].Borough.toLowerCase() === categoryData[i].Borough.toLowerCase() && orgNum > 1) {  
            dulicatedOrgs.push(categoryData[i])
        }
        if (allData[i].Organisation.toLowerCase() === categoryData[i].Organisation.toLowerCase() && allData[i].Borough.toLowerCase() === categoryData[i].Borough.toLowerCase() && orgNum === 1) {  
            unduplicatedOrgs.push(categoryData[i])
        }
    }

    // Get organizations name and borough
    const orgsNameAndBorough = [];
    dulicatedOrgs.map(org => {
        const { Organisation, Borough } = org;
        orgsNameAndBorough.push({ Organisation, Borough });
    })

    // Remove duplication from organizations name and borough
    //const orgs = [...new Set(orgsNameAndBorough)]
    const orgs = orgsNameAndBorough.filter((elem, index, self) =>
        index === self.findIndex(item => item.Organisation === elem.Organisation && item.Borough === elem.Borough
    ))

    // Put each duplicated organization into one array 
    // then but all of them at one array
    const singleDuplicatedOrgs = []

    orgs.map(item => {
        const singleOrg = [];
        for (let i = 0; i < dulicatedOrgs.length; i++) {
            if (dulicatedOrgs[i].Organisation.toLowerCase() === item.Organisation.toLowerCase() && dulicatedOrgs[i].Borough.toLowerCase() === item.Borough.toLowerCase()) {
                singleOrg.push(dulicatedOrgs[i])
            }
        }
        singleDuplicatedOrgs.push(singleOrg);
    })

    // Move all days from each duplicated organization to one of them and return only one that have these days
    const updatedDuplicatedOrgs = [];
    const filteredDuplicatedOrgs = singleDuplicatedOrgs.map(org => {

        // Check if there an organisation has more than day
        const daysOfTheWeek = [];
        const Days = org.map(singleOrg => {
        const days = singleOrg.Days;
        if (days.includes(',')) {
            return days.split(',').map(day => daysOfTheWeek.push(day.trim()))
        }
        return daysOfTheWeek.push(days.trim())
        })
        // Remove the duplication if there is on days of the week
        const allDays = [...new Set(daysOfTheWeek)];

        // Put that days that have good format at one array 
        // and the one that has bad format at anther array
        const daysHaveBadFromat = [];
        const daysAtGoodFormat = [];

        allDays.map(item => {
        if (
            item.toLowerCase().includes('monday') ||
            item.toLowerCase().includes('tuesday') ||
            item.toLowerCase().includes('wednesday') ||
            item.toLowerCase().includes('thursday') ||
            item.toLowerCase().includes('friday') ||
            item.toLowerCase().includes('saturday') ||
            item.toLowerCase().includes('sunday')
        ) {
            daysAtGoodFormat.push(item)
        } else {
            daysHaveBadFromat.push(item)
        }
        })
        
        // Check again if there is a duplication on days and remove it.
        const goodDaysData = [...new Set(daysAtGoodFormat)];
        const badDaysData = [...new Set(daysHaveBadFromat)];

        org.filter(
            (elem, index, self) =>
            index ===
            self.findIndex(
                toDo =>
                toDo.Organisation.toLowerCase() === elem.Organisation.toLowerCase() &&
                toDo.Borough.toLowerCase() === elem.Borough.toLowerCase()
            )
        ).map(organization => {    
            const { Organisation,Area, Borough, Services, Website, Clients, Email, Postcode, Address, Tel, Project, Tag, Categories } = organization;
            const processData = [ organization.Process, ...badDaysData];
            const Process = processData.join(',');

            updatedDuplicatedOrgs.push({ 
                Organisation,Area, Borough, Services, Website, Clients, 
                Days: goodDaysData, Process, Email, Postcode, Address, 
                Tel, Project, Tag, Categories
            })
        })  
    })

    // check for any duplication
    const updatedDuplicatedOrgsorg = updatedDuplicatedOrgs.filter((elem, index, self) =>
        index === self.findIndex(
        toDo =>
            toDo.Organisation.toLowerCase() === elem.Organisation.toLowerCase() &&
            toDo.Borough.toLowerCase() === elem.Borough.toLowerCase()
    ))

    // Check unduplicated organizations days column if has bad days format move them to process column
    const filteredUnDuplicatedOrgs = unduplicatedOrgs.map(org => {
        const { Days } = org;
        const goodDaysFormat = [];
        const badDaysFormat = [];

        if (
            Days.toLowerCase() === 'monday' ||
            Days.toLowerCase() === 'tuesday' ||
            Days.toLowerCase() === 'wednesday' ||
            Days.toLowerCase() === 'thursday' ||
            Days.toLowerCase() === 'friday' ||
            Days.toLowerCase() === 'saturday' ||
            Days.toLowerCase() === 'sunday'
        ) {
            goodDaysFormat.push(Days)
        }else{
            badDaysFormat.push(Days)
        }

        const { Organisation,Area, Borough, Services, Website, Clients, Email, Postcode, Address, Tel, Project, Tag, Categories } = org;
            const processData = [ org.Process, ...badDaysFormat];
            const Process = processData.join(',');
            return { 
                Organisation,Area, Borough, Services, Website, Clients, 
                Days: goodDaysFormat, Process, Email, Postcode, Address, 
                Tel, Project, Tag, Categories
            } 
    })

    const allProcessedData = filteredUnDuplicatedOrgs.concat(updatedDuplicatedOrgsorg);

    return allProcessedData;
})

const flattenedFinalData = finalData.reduce((acc, val) => acc.concat(val), []);

module.exports = flattenedFinalData;
