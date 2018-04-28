import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className={`card-img-top ` +  this.props.className} src={this.props.src} alt={this.props.alt}/>
        );
    }
}

CardImage.defaultProps = {
    className:'',
}
