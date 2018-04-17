module.exports = {
  removeDuplications: data =>
    data.filter((elem, index, self) => index === self.indexOf(elem))
}
