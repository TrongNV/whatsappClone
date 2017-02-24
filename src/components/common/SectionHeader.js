import React, { Component, PropTypes } from 'react';
import {
    View,
    Text
} from 'react-native';

class SectionHeader extends Component {
    static propType = {
        title: PropTypes.string.isRequired,
        sectionID: PropTypes.string,
        updateTag: PropTypes.string,
    }

    render() {
        return (
            <View ref={`sectionHeader${this.props.sectionID}`} style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        backgroundColor: '#ccc'
    },
    title: {
        fontSize: 16,
        fontWeight: '400'
    }
};

export default SectionHeader;
