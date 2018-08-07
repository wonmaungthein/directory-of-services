const fetch = require('node-fetch')
const fs = require('fs')
const fetchedData = require('./fetchedDataFromSpreadsheet.json')
;('use strict')

// convert the data to json format and save it into new file
function convertToJsonFile (data, fileName) {
  const stringData = JSON.stringify(data, null, 2)
  fs.writeFileSync(`${fileName}.json`, stringData)
}

// Arrays of days 
const days2 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const days3 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const days4 = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

// Areas
const consistentArea = [
  'North London', 'South London', 'West London', 'Central London' , 'East London', 'Any', 'Bristol',
  'Canterbury', 'Online', 'Swale', 'Kent'
];

// Borough 
const consistentBoro = [
  "Barking and Dagenham", "Barnet", "Bexley" ,"Brent" ,"Bromley" ,"Camden" , 
  "City of London","Croydon" , "Ealing" , "Enfield" , "Greenwich" , "Hackney" , 
  "Hammersmith and Fulham" , "Haringey" , "Harrow" ,"Havering" ,"Hillingdon" , "Hounslow" ,  
  "Islington" , "Kensington and Chelsea",  "Kingston upon Thames" , "Lambeth" ,  "Lewisham" , 
  "Merton" , "Newham" , "Redbridge" ,"Richmond upon Thames" , "Southwark" , "Sutton" ,
  "Tower Hamlets" ,"Waltham Forest" ,"Wandsworth" ,"Westminster", "All"
]; 

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

const area = [];
// Flat data fetched (fetchedData) from spreadsheet, add tag, categorie and projet fields
// Make name of day field consistent
const flat = () => {
  return fetchedData.map((item, index) => {
    for (let cat in item) {
      return item[cat]
        .map(el => {
          for (let orgFields in el) {
            // Make sure key for day fiels is Days for every org
            if (orgFields === 'Day') {
              el.Days = el[orgFields]
              delete el[orgFields]
            } else if (orgFields === 'Telephone') {
              el.Tel = el[orgFields]
              delete el[orgFields]
            } else if (orgFields === '_Organisation') {
              el.Organisation = el[orgFields]
              delete el[orgFields]
            }
          }
          // Add new key field to every org
          // el.map(org => )area.push(org.Area
          area.push(el.Borough)
          el.Project = ''
          el.Tag = ''
          el.Categories = cat
          return el
        })
        
        // Remove(filter) empty organisations
        .filter(function (el) {
          return el.Organisation !== '';
        })
    }
  })
}

let flattenedData = flat();

// Update Area field input
const updateOrgArea = flattenedData.map(orgs => orgs.map(org => {
  let testArea;
  for(let i = 0; i < consistentArea.length; i += 1){
    if (org.Area.toLowerCase() === (consistentArea[i].toLocaleLowerCase())){
    testArea = ( consistentArea[i] );
  } else if(org.Area.toLowerCase().includes('all') || org.Area === 'London'){
    testArea = ( 'Any');
  }
  else if(org.Area.toLowerCase() !== consistentArea[i].toLowerCase() && org.Area.toLowerCase().charAt(0) === consistentArea[i].toLowerCase().charAt(0) && !org.Area.includes('N/A')){
    testArea = ( consistentArea[i] );
  }  else if(org.Area.includes('N/A') || !org.Area){
    testArea = ( 'N/A');
  } else if(org.Area.includes('UK')){
    testArea = ( 'UK');
  } else if (org.Area.includes('Dagenham')){
    testArea = ('East London')
  }else if (org.Area.includes('Stockwell') || org.Area.includes('Croydon')){
    testArea = ('South London')
  }
}
return {...org, Area: testArea};
})
)

// Update borough field input
const updateOrgBorough = updateOrgArea.map(orgs => orgs.map(el=> {
  let updateBorough;
  for(let i = 0; i < consistentBoro.length; i += 1){
    if (el && consistentBoro[i].toLowerCase().includes(el.Borough.toLowerCase())){
      updateBorough = consistentBoro[i] ;
    } else if (el.Borough.toLowerCase().includes(consistentBoro[i].toLowerCase())){
      updateBorough = consistentBoro[i] ;
    } 
    else if (el.Borough.includes('Nationwide')){
      updateBorough = 'Nationwide' ;
    } else if (el.Borough.includes('Essex/\nEast London') || el.Borough.includes('Essex/East London')){
      updateBorough = 'Essex East London' ;
    } else if (el.Borough.includes('Deptford')){
      updateBorough = 'Lewisham' ;
    } else if (el.Borough.includes('Kilburn') || el.Borough.includes('Willesden') || el.Borough.includes('Willesdon') || el.Borough.includes('Wembley')){
      updateBorough = 'Brent' ;
    }  else if (el.Borough.includes('Old Street') ){
      updateBorough = 'Islington' ;
    } else if (el.Borough.includes('Canterbury') ){
      updateBorough = 'Canterbury' ;
    } else if (el.Borough.includes('Lynsted') || el.Borough.includes('Dartford')){
      updateBorough = 'Kent' ;
    } 
    else if (el.Borough.includes('N/A') || !el){
      updateBorough = 'N/A' ;
    }  else if (el.Borough.includes('Hammersmith, Fulham, K & C, Barnes, Putney') || el.Borough.includes('Hammersmith & Fulham')){
      updateBorough = 'Hammersmith and Fulham' ;
    } else if (el.Borough.includes('Ladbroke Grove') || el.Borough.includes('Notting Hill') || el.Borough.includes('Kensington &\nChelsea')){
      updateBorough = 'Kensington and Chelsea' ;
    } else if (el.Borough.includes('Elephant and Castle') || el.Borough.includes('Dulwich') ){
      updateBorough = 'Southwark' ; 
    } else if (el.Borough.includes('Hertfordshire') ){
      updateBorough = 'Hertfordshire' ;
    } else if (el.Borough.includes('London and Surrey') ){ // to check later
      updateBorough = 'London and Surrey' ; 'Farringdon/ Battersea'
    } else if (el.Borough.includes('Farringdon/ Battersea') || el.Borough.includes('Battersea') ){ // to check later include  borough
      updateBorough = 'Wandsworth' ; 
    }else if (el.Borough.includes('Bristol') ){
      updateBorough = 'Bristol' ;
    } else if (el.Borough.includes('Across London') ){
      updateBorough = 'Across London' ;  // To check later
    } else if (el.Borough.includes('Wimbledon') ){
      updateBorough = 'Merton' ;  // To check later
    } else if (el.Borough.includes('Ilford') ){
      updateBorough = 'Redbridge' ;  // To check later
    } else if (el.Borough.includes('Barking & Dagenham') ){
      updateBorough = 'Barking and Dagenham' ;  // To check later
    } else if (el.Borough.includes('UK') ){
      updateBorough = 'UK' ;  // To check later
    }else if (el.Borough.includes('Wapping') ){
      updateBorough = 'Tower Hamlets' ;  // To check later
    } else if (el.Borough.includes('National') ){
      updateBorough = 'National' ;  // To check later
    }else if (el.Borough.includes('Pan London') ){
      updateBorough = 'Pan London' ;  // To check later
    }
}
return {...el, Borough: updateBorough};
})
)


const finalData = updateOrgBorough.map(categoryData => {
  // create new array contain single category data
  const allData = [];

  // Get duplicated organizations for single category
  const duplicatedOrgs = [];

  // Get unduplicated organizations for single category
  const unduplicatedOrgs = [];

  for (let i = 0; i < categoryData.length; i++) {
    allData.push(categoryData[i])
    const orgNum = categoryData.filter(
      item =>
        item.Organisation.toLowerCase() ===
          categoryData[i].Organisation.toLowerCase() &&
        item.Borough.toLowerCase() === categoryData[i].Borough.toLowerCase() &&
        item.Area.toLowerCase() === categoryData[i].Area.toLowerCase()
    ).length
    if (
      allData[i].Organisation.toLowerCase() ===
        categoryData[i].Organisation.toLowerCase() &&
      allData[i].Borough.toLowerCase() ===
        categoryData[i].Borough.toLowerCase() &&
        allData[i].Area.toLowerCase() ===
        categoryData[i].Area.toLowerCase() &&
      orgNum > 1
    ) {
      duplicatedOrgs.push(categoryData[i])
    }
    if (
      allData[i].Organisation.toLowerCase() ===
        categoryData[i].Organisation.toLowerCase() &&
      allData[i].Borough.toLowerCase() ===
        categoryData[i].Borough.toLowerCase() &&
        allData[i].Area.toLowerCase() ===
        categoryData[i].Area.toLowerCase() &&
      orgNum === 1
    ) {
      unduplicatedOrgs.push(categoryData[i])
    }
  }
  
  // Get organizations name and borough
  const orgsNameAndBorough = []
  duplicatedOrgs.map(org => {
    const { Organisation, Borough, Area } = org
    orgsNameAndBorough.push({ Organisation, Borough, Area })
  })

  // Remove duplication from organizations name and borough
  // const orgs = [...new Set(orgsNameAndBorough)]
  const orgs = orgsNameAndBorough.filter(
    (elem, index, self) =>
      index ===
      self.findIndex(
        item =>
          item.Organisation === elem.Organisation &&
          item.Borough === elem.Borough &&
          item.Area === elem.Area
      )
  )

  // Put each duplicated organization into one array
  // then but all of them at one array
  const singleDuplicatedOrgs = []

  orgs.map(item => {
    const singleOrg = []
    for (let i = 0; i < duplicatedOrgs.length; i++) {
      if (
        duplicatedOrgs[i].Organisation.toLowerCase() ===
          item.Organisation.toLowerCase() &&
        duplicatedOrgs[i].Borough.toLowerCase() === item.Borough.toLowerCase() &&
        duplicatedOrgs[i].Area.toLowerCase() === item.Area.toLowerCase()
      ) {
        singleOrg.push(duplicatedOrgs[i])
      }
    }
    singleDuplicatedOrgs.push(singleOrg)
  })

  // Move all days from each duplicated organization to one of them and return only one that have these days
  const updatedDuplicatedOrgs = []

  singleDuplicatedOrgs.map(org => {

    // Check if there an organisation has more than day
    const  daysHaveGoodFormat = [];
    const daysHaveBadFormat = [];

    org.map(singleOrg => {
      const days = singleOrg.Days

    for (let i = 0; i < days2.length; i++) {
      if ( days.toLowerCase().includes(days2[i].toLowerCase())) {
        for (let j = 0; j < days4.length; j++) {
          if (days4[j].includes(days2[i] )) {
            daysHaveGoodFormat.push(days3[j])
          } 
        }
      }
    }

    // Check if days string and good days string has same length and if Days include extra info 
    if ((days.trim().length !== [...new Set(daysHaveGoodFormat)].join().trim().length) && 
        (days.includes('-') || 
        (days.includes('00')) || 
        (days.includes('pm')) ||
        (days.includes('pm')) ||
        (days.includes('year')) ||
        (days.includes('advice')) ||
        (days.includes('times')) ||
        (days.includes('hour')) ||
        (days.includes('/')) ||
        (days.includes('month')) 
      )){
      daysHaveBadFormat.push(days)
    }

    // If days match exactely useless days arr empty useless days arr
    for(let a = 0; a < days4.length; a++) {
      if (days === (days4[a])) {
        daysHaveBadFormat.pop(days4[a])
      }
    }
    
    })
    
    const inconsistentDay = [...new Set(daysHaveBadFormat)];
    const consistentDay = [...new Set(daysHaveGoodFormat)];

    org
      .filter(
        (elem, index, self) =>
          index ===
          self.findIndex(
            toDo =>
              toDo.Organisation.toLowerCase() ===
                elem.Organisation.toLowerCase() &&
              toDo.Borough.toLowerCase() === elem.Borough.toLowerCase() &&
              toDo.Area.toLowerCase() === elem.Area.toLowerCase()
          )
      )
      .map(organization => {
        const {
          Organisation,
          Area,
          Borough,
          Services,
          Website,
          Clients,
          Email,
          Postcode,
          Address,
          Tel,
          Project,
          Tag,
          Categories
        } = organization
        const processData = [organization.Process, ...inconsistentDay]
        const Process = processData.join(',')

        updatedDuplicatedOrgs.push({
          Organisation,
          Area,
          Borough,
          Services,
          Website,
          Clients,
          Days: consistentDay,
          Process,
          Email,
          Postcode,
          Address,
          Tel,
          Project,
          Tag,
          Categories
        })
      })
  })

  // check for any duplication
  const updatedDuplicatedOrgsorg = updatedDuplicatedOrgs.filter(
    (elem, index, self) =>
      index ===
      self.findIndex(
        toDo =>
          toDo.Organisation.toLowerCase() === elem.Organisation.toLowerCase() &&
          toDo.Borough.toLowerCase() === elem.Borough.toLowerCase() &&
          toDo.Area.toLowerCase() === elem.Area.toLowerCase()
      )
  )

  // Check unduplicated organizations days column if has bad days format move them to process column
  const filteredUnDuplicatedOrgs = unduplicatedOrgs.map(org => {
    const { Days } = org
    const goodDaysFormat = []
    const badDaysFormat = []

    // Case days are Monday To Friday
    if(Days.match('Mon - Fri') || 
    Days.match('Monday to Friday') ||
    Days.match('Mondays to Fridays') ||
    Days.match('Mon-Fri')){
      goodDaysFormat.push('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')
    }

    // Case days are Monday To Thursday
    if(Days.match('Mondays-Thursdays') ||
    Days.match('Mondays – Thursdays') || 
    Days.match('Monday-Thursday') ||
    Days.match('Monday - Thursday') ||
    Days.match('Mon to Thu') ||
    Days.match('Mon - Thu') ||
    Days.match('Mon-Thu')){
      goodDaysFormat.push('Monday', 'Tuesday', 'Wednesday', 'Thursday');
    }

    // Case days are Monday To Wednesday
    if(Days.match('Mondays-Wednesdays') ||
    Days.match('Mondays - Wednesdays') || 
    Days.match('Monday-Wednesday') ||
    Days.match('Monday - Wednesday') ||
    Days.match('Mon to Wed') ||
    Days.match('Mon - Wed') ||
    Days.match('Mon-Wed')){
      goodDaysFormat.push('Monday', 'Tuesday', 'Wednesday');
    }

    // Case days are Monday To Saturday
    if(Days.match('Mon - Sat ') || 
    Days.match('Monday to Saturday') ||
    Days.match('Mondays to Saturdays') ||
    Days.match('Mon-Sat')){
      goodDaysFormat.push('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
    }
   
    // Push element of day3 array when condition is true
    for (let i = 0; i < days2.length; i++) {
      if ( Days.toLowerCase().includes(days2[i].toLowerCase())) {
        for (let j = 0; j < days3.length; j++) {
          if (days3[j].includes(days2[i] )) {
            goodDaysFormat.push(days3[j])
          } 
        }
      }
    }

    // Remove Monday from good day array if Days arr contain 'month' 
    if (Days.toLowerCase().includes('month')) {
      goodDaysFormat.shift('days3[0]');
    } 
    
    // Check if Days string and good days string has same length and if Days include extra info 
    if ((Days.trim().length !== [...new Set(goodDaysFormat)].join().trim().length) && 
        (Days.includes('-') || 
        (Days.includes('00')) || 
        (Days.includes('pm')) ||
        (Days.includes('pm')) ||
        (Days.includes('year')) ||
        (Days.includes('advice')) ||
        (Days.includes('times')) ||
        (!Days.includes('hour')) ||
        (!Days.includes('/')) ||
        (Days.includes('month')) 
      )){
      badDaysFormat.push(Days)
    }

    // If Days match exactely bad days arr empty bad days arr
    for(let a = 0; a < days4.length; a++) {
      if (Days.match(days4[a])) {
        badDaysFormat.pop(days4[a])
      }
    }
    
    const inconsistentDays = [...new Set(badDaysFormat)];
    const consistentDays = [...new Set(goodDaysFormat)];
    
    const {
      Organisation,
      Area,
      Borough,
      Services,
      Website,
      Clients,
      Email,
      Postcode,
      Address,
      Tel,
      Project,
      Tag,
      Categories
    } = org
    const processData = [org.Process, ...inconsistentDays];
    const Process = processData.join(',');
    return {
      Organisation,
      Area,
      Borough,
      Services,
      Website,
      Clients,
      Days: consistentDays,
      Process,
      Email,
      Postcode,
      Address,
      Tel,
      Project,
      Tag,
      Categories
    }
  })
  
  const allProcessedData = filteredUnDuplicatedOrgs.concat(
    updatedDuplicatedOrgsorg
  )

  return allProcessedData
})

const flattenedFinalData = finalData.reduce((acc, val) => acc.concat(val), []);





module.exports = flattenedFinalData;
