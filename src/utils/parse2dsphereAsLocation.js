module.exports = function parse2dsphereAsLocation(latitude, longitude) {
  return {
    type: 'Point',
    coordinates: [longitude, latitude],
  };
}