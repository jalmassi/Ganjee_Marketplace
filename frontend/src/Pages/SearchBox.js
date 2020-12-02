import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = props => {

    return (
        <input
            type='search'
            className='search'
            placeholder={props.placeholder}
            onKeyDown = {props.handleChange}
        />

    );
};

SearchBox.propTypes = {

};

export default SearchBox;