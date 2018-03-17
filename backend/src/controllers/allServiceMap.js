const resultMaps = [
  {
    mapId: 'orgMap',
    idProperty: 'org_id',
    properties: ['Organisation'],
    collections: [
      { name: 'branch', mapId: 'branchMap', columnPrefix: 'branch_' }
    ]
  },
  {
    mapId: 'branchMap',
    idProperty: 'branch_id',
    properties: ['borough'],
    collections: [
      { name: 'address', mapId: 'addressMap', columnPrefix: 'address_' },
      { name: 'service', mapId: 'serviceMap', columnPrefix: 'service_' }
    ]
  },
  {
    mapId: 'addressMap',
    idProperty: 'address_id',
    properties: [
      'address_line',
      'area',
      'postcode'
    ],
    collections: [
      { name: 'location', mapId: 'locationMap', columnPrefix: 'location_' }
    ]
  },
  {
    mapId: 'serviceMap',
    idProperty: 'service_id',
    properties: [
      'days',
      'process'
    ],
    collections: [
      { name: 'categories', mapId: 'categoryMap', columnPrefix: 'categories_' }
    ]
  },
  {
    mapId: 'locationMap',
    idProperty: 'location_id',
    properties: [
      'latitude',
      'longitude'
    ]
  },
  {
    mapId: 'categoryMap',
    idProperty: 'categories_id',
    properties: [
      'categories_name'
    ]
  }
];
module.exports = resultMaps;
