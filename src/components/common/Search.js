import React from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: searchWidth, height: searchHeight } = Dimensions.get('window');

const Search = () => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
                <View style={styles.placeholderContainer}>
                    <Icon name="ios-search" size={16} color="rgba(0, 0, 0, 0.5)" />
                    <Text style={{ marginLeft: 5, color: 'rgba(0, 0, 0, 0.5)' }}>Search</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                />
            </View>
        </View>
    );
};
const styles = {
    container: {
        backgroundColor: '#ddd',
        paddingTop: 6,
        paddingRight: 10,
        paddingBottom: 6,
        paddingLeft: 10,
        height: 45,
    },
    textInput: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
    },
    placeholderContainer: {
        flexDirection: 'row',
        position: 'absolute',
        marginTop: 7,
        marginLeft: searchWidth / 2 - 40
    }
};

export { Search };
