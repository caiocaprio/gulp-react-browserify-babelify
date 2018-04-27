import React from 'react';

/**
 * @param {any} {type, ...props } 
 * @returns Label
 */
const Label = ({type, ...props }) => {
    return <label {...props}/>;  
}

export default Label;