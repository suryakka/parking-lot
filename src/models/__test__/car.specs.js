const Car = require('../car.js');

test('car model test ', () => {

  var car = new Car('KA-1234-HH');
  expect(car.NUMBER).toEqual('KA-1234-HH');
});