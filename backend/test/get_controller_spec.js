import { expect } from 'chai'
import {
  getBranchesByPostcode,
  getBranchesByCategory,
  getBranchesByBorough,
  getAllOrgainisation,
  getListOfCategories,
  getListOfBoroughs,
  getBranchesByDay,
  getListOfAreas
} from '../src/controllers/get_controller'

describe('Test get controller functions', () => {
  it('Should get list of organizations its length equal 313', async () => {
    const result = await getAllOrgainisation();
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(313)
  })

  it('Should get list of categories its length equal 18', async () => {
    const result = await getListOfCategories();
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(18)
  })

  it('Should get list of boroughs its length equal 37', async () => {
    const result = await getListOfBoroughs();
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(37)
  })

  it('Should get list of areas its length equal 11', async () => {
    const result = await getListOfAreas();
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(11)
  })

  it('Should get list of branches sorted by postcode and its length equal 33', async () => {
    const lat = 51.47018; const long = 0.36538; const category = 'Education'
    const result = await getBranchesByPostcode(category, lat, long);
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(33)
  })

  it('Should get list of branches filtered by category and its length equal 33', async () => {
    const category = 'Education'
    const result = await getBranchesByCategory(category);
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(33)
  })

  it('Should get list of branches filtered by day and its length equal 61', async () => {
    const day = 'Monday'
    const result = await getBranchesByDay(day);
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(61)
  })

  it('Should get list of branches filtered by borough and its length equal 12', async () => {
    const borough = 'Hounslow'
    const result = await getBranchesByBorough(borough);
    expect(result).to.be.a('array')
    expect(result).to.have.lengthOf(12)
  })
})
