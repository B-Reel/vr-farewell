var THREE = require('three');

/**
 * @param {float} min
 * @param {float} max
 * @param {boolean} round
 */
function random(min, max, round) {
  var value = Math.random() * (max - min) + min;
  return round ? Math.round(value) : value;
};

/**
 * @returns {{[name:string]:string}}
 */
function getTextAndColorsFromHash() {
  var hash = window.location.hash;

  var text = null;
  var colors = null;

  hash.substr(1).split('&').forEach(function(part) {
    var subpart = part.split('=');

    if(subpart.length) {
      if(subpart[0] === 'text') {
        text = subpart[1].toUpperCase();
      } else if(subpart[0] === 'colors') {
        colors = subpart[1].toUpperCase();
      }
    }
  });

  if(text === null) {
    text = 'HELLO WORLD';
  }

  if(colors === null) {
    if(text !== null) {
      colors = Array.prototype.map.call(text, function() {
        return Math.random() < 0.5 ? 'S' : 'G';
      }).join('');
    } else {
      colors = 'SSSSS GGGGG';
    }
  }

  return {
    text: text,
    colors: colors
  }
};

var KeyCodes = {
  Q: 81,
  SPACE: 32
};

function sendTextToAnalytics(text) {
  if(!ga) {
    return;
  }

  ga('set', 'dimension1', text);  
  ga('send', 'pageview');
}

module.exports = {
  random: random,
  textureLoader: new THREE.TextureLoader(),
  jsonLoader: new THREE.JSONLoader(),
  getTextAndColorsFromHash: getTextAndColorsFromHash,
  KeyCodes: KeyCodes,
  sendTextToAnalytics: sendTextToAnalytics
};
