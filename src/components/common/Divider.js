import React, { PropTypes } from 'react';
import { View } from 'react-native';

const propTypes = {
    style: PropTypes.object
};
const Divider = ({ style }) => {
    return <View style={[styles.divider, style]} />;
};

const styles = {
    divider: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    }
};
Divider.propTypes = propTypes;

export { Divider };
