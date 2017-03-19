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

// from m per s
// result will be rounded
export function toKmPerH(val) {
  return Math.round(val * 3600.0 / 1000);
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
  if (!str || !str.startsWith("@")) return false;
  const vals = str.substring(1).split(",");
  if (vals.length !== 2) return false;
  if (vals.some((val) => ! val.match(/^[+-]?\d+$|^[+-]?\d+\.\d*$/))) return false;
  return vals;
}

export function constrainTextLen(text, len, trail = "...") {
  if (text.length <= len) return text;
  return text.substring(0, len - trail.length) + trail;
}

// minimalist for now
export function formatUTC(utc) {
  const date = new Date(utc * 1000);
  return date.toString();
}

export const Z_INDEX = {
  navBar: 100,
  progressBar: 200,
  bottom: Number.MIN_SAFE_INTEGER,
  top: Number.MAX_SAFE_INTEGER
};

export function getWeatherImage(description) {
  const des = description.toLowerCase();
  if (des.includes("overcast") || des.includes("cloud")) {
    return { src: "/images/cloudy.png", alt: "cloud", title: "cloud" };
  }
  else if (des.includes("rain")) {
    return { src: "/images/rain.png", alt: "rain", title: "rain" };
  }
  else if (des.includes("snow")) {
    return { src: "/images/snow.png", alt: "snow", title: "snow" };
  }
  else if (des.includes("storm") || des.includes("thunder")
      || des.includes("lighting")) {
    return { src: "/images/storm.png", alt: "storm", title: "storm" };
  }
  else if (des.includes("sun") || des.includes("clear")) {
    return { src: "/images/sunny.png", alt: "sunny", title: "sunny" };
  }
  else {
    return { src: "/images/default.png", alt: "default", title: "default" };
  }
};
