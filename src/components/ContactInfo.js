import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

const propTypes = {
    user: PropTypes.object.isRequired
};

class ContactInfo extends Component {
    render() {
        return (
            <View>
                <Text>ContactInfo</Text>
                <Text>{this.props.user.name}</Text>
            </View>
        );
    }
}
ContactInfo.propTypes = propTypes;

export default ContactInfo;
