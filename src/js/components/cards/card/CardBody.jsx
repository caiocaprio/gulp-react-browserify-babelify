
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div {...this.props} className={`card-body ` + this.props.className }>
                {this.props.children ? this.props.children : ``}
            </div>
        );
    }
}

CardBody.defaultProps = {
    className:'',
}