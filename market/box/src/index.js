import Box from './components/box';
import Layout from './components/layout';
import Paragraph from './components/paragraph';
import Toolbar from './components/toolbar';
import Event from './utils/Event';

const components = {
    Box,
    Layout,
    Paragraph,
    Toolbar
};

const box = components;

const install = function(Vue, opts = {}) {
    if (install.installed) return;

    Object.keys(box).forEach(key => {
        Vue.component(key, box[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install,
    Event,
    ...components
};


module.exports.default = module.exports = API;   // eslint-disable-line no-undef
