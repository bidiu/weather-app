export function isGeoAvailable() {
  return "geolocation" in navigator;
};

export function getCurrentPos(onSuccess, onFailure) {
  navigator.geolocation.getCurrentPosition(function(position) {
    onSuccess(position.coords);
  }, function(code) {
    onFailure(code);
    alert("To show the weather of your location, please allow this app :P");
  });
};
