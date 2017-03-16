export function isGeoAvailable() {
  return "geolocation" in navigator;
};

export function getCurrentPos(callback) {
  navigator.geolocation.getCurrentPosition(function(position) {
    callback(position.coords);
  }, function(code) {
    alert("To show the weather of your location, please allow this app :P");
  });
};
