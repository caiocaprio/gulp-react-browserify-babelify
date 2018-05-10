import React from 'react';
import { render } from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';

// // require('babelify-es6-polyfill');

import App from './app';
// import Sass from './../scss/main.scss';

// require('Bundle');

// // import Bundle from './../public/js/all.min.js';
// //import Url from './../public/css/main.css';
// // // import './js/demo';



render( <App /> , document.querySelector('#app'));
 if (process.env.NODE_ENV !== 'production') {
       console.log('Development mode!');
     }else{
        console.log('Production mode!');
     }
// registerServiceWorker();
// {/* render( <h1>teste</h1> , document.querySelector('#app')); */}