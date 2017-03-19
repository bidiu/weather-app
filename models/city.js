const fs = require ('fs');
const path = require("path");

// city model, data loaded in memmory, without database server

const DATA_PATH = path.resolve(__dirname, '..', 'data', 'cities.txt');
var loadCompleted = false;
var ALL = null;

fs.readFile(DATA_PATH, 'utf8', (err, data) => {
  if (err) {
    console.log('city model: failed to load city name data, which is used to provide input hints for users.');
    throw err;
  }
  ALL = data.split('\n');
  loadCompleted = true;
  console.log("city model: city name data loaded.");
});

const City = () => { /* empty */ };

City.prefixMatched = function(prefix, size) {
  if (! loadCompleted) return [];

  const result = [];
  prefix = prefix.toLowerCase();
  var matchedIndex = ALL.findIndex((el) => {
    return el.toLowerCase().startsWith(prefix);
  });
  if (matchedIndex === -1) return [];
  for (let i = 0; i < size && ALL[matchedIndex].toLowerCase().startsWith(prefix);
      i++, matchedIndex++) {
    result.push(ALL[matchedIndex]);
  }
  return result;
};

City.all = function(offset, size) {
  if (! loadCompleted) return [];
  return ALL.slice(offset, offset + size);
}

module.exports = City;
