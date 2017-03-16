// will round
export function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
};

// will round
export function toKelvin(celsius) {
  return Math.round(celsius + 273.15);
};

// to title case, like "Title Case"
export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// color related, messy, from StackOverflow, altered
export function transColor(hex, lum) {
  hex = rgbToHex(hex);
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;
  // convert to decimal and transfer color
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
  }
  return rgb;
}
// r, g, or b to hex
function valueToHex(v) {
    var hex = parseInt(v).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
function valuesToHex(r, g, b) {
    return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
}
// "rgb(255, 255, 255)" to "#ffffff"
// NOT support RGB with alpha channel!
function rgbToHex(hex) {
  if (! hex.startsWith("rgb")) {
    return hex;
  }
  const values = hex.replace(/[^0-9,]/gi, '').split(',');
  return valuesToHex(...values);
}

// determine whether given string is a coordinate:
//    @23.13,23.343, or
//    @32,123.
// if not a coordinate string, return false
// otherwise, return a string array with 2 elements
//    - latitude and longitude, both of them are returned as string
export function isCoordStr(str) {
  if (! str.startsWith("@")) return false;
  const vals = str.substring(1).split(",");
  if (vals.length !== 2) return false;
  if (vals.some((val) => ! val.match(/^[+-]?\d+$|^[+-]?\d+\.\d*$/))) return false;
  return vals;
}
