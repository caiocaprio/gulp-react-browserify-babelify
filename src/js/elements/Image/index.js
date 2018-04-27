import React from 'react';

/**
 * @param {any} {type, ...props } 
 * @returns Image Element
 */
const Image = ({type, ...props }) => {
    return <img {...props}/>;  
}

export default Image;