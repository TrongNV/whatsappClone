import React, { Component, PropTypes } from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';

class CallsTitle extends Component {
    state = {
        isAll: true,
    }

    render() {
        const {
            container,
            button,
            buttonLeft,
            buttonRight,
            buttonDefault,
            buttonSelected,
            buttonTextDefault,
            buttonTextSelected,
        } = styles;
        return (
            <View style={container}>
                <TouchableOpacity
                    style={[button, buttonLeft, this.state.isAll ? buttonSelected : buttonDefault]}
                    onPress={() => this.setState({ isAll: true })}
                >
                    <Text style={!this.state.isAll ? buttonTextSelected : buttonTextDefault}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[button, buttonRight, !this.state.isAll ? buttonSelected : buttonDefault]}
                    onPress={() => this.setState({ isAll: false })}
                >
                    <Text style={this.state.isAll ? buttonTextSelected : buttonTextDefault}>Missed</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 23,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 30,
        borderWidth: 1,
        borderColor: '#0173fa'
    },
    buttonLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    buttonRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonDefault: {
        backgroundColor: 'transparent'
    },
    buttonSelected: {
        backgroundColor: '#0173fa'
    },
    buttonTextDefault: {
        color: '#fff',
        fontSize: 14
    },
    buttonTextSelected: {
        color: '#0173fa',
        fontSize: 14
    },
};

export default CallsTitle;
