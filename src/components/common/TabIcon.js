import React, { PropTypes } from 'react';
import {
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
    defaultIcon: PropTypes.string.isRequired,
    selectedIcon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    colorDefault: PropTypes.string,
    colorSelected: PropTypes.string,
    selected: PropTypes.bool,
    titleStyle: PropTypes.object,
};

const TabIcon = ({
    title,
    defaultIcon,
    selectedIcon,
    selected,
    titleStyle
}) => {
    const {
        container,
        textStyle,
        defaultStyle,
        selectedStyle
    } = styles;
    return (
        <View style={container}>
            <Icon
                name={selected ? selectedIcon : defaultIcon}
                style={selected ? selectedStyle : defaultStyle}
                size={32}
            />
            <Text
                style={
                    [
                        textStyle,
                        selected ? selectedStyle : defaultStyle,
                        titleStyle
                    ]
                }
            >
                {title}
            </Text>
        </View >
    );
};

TabIcon.propTypes = propTypes;

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 12,
    },
    defaultStyle: {
        color: 'rgba(0, 0, 0, 0.5)'
    },
    selectedStyle: {
        color: '#0173fa'
    }
};

export { TabIcon };
