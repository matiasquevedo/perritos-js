try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

window.fontawesome = require('@fortawesome/fontawesome-free');
window.chosen = require('chosen-js');
window.leaflet = require('leaflet');