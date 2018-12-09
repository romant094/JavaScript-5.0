import slider from './parts/slider.js';
import modal from './parts/modal.js';
import valid from './parts/valid.js';

window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js'),
        calc = require('./parts/calc.js');

    tabs();
    timer();
    slider();
    calc();
    modal();
    valid();
});