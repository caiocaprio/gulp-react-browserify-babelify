import React from 'react';
import PropTypes from 'prop-types';
// import Cards from '../cards/Cards';
// import GitHub from '../github/GitHub';
import Contentful from '../contentful/Contentful.js';
import Header from '../header/Header.jsx';


const App = ({ title }) => (
     <div className="teste">

         <Header/>
         {/* <h1>{title}</h1>
         <Cards /> */}
        <div className="container">
            <Contentful/>
            <Contentful/>
            <Contentful/>
            <Contentful/>
            <Contentful/>
        
        </div>
     </div>

);

App.propTypes = {
    title: PropTypes.string.isRequired
};

export default App;
