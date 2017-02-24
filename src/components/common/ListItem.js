import React, { PropTypes } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';

const propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    renderRight: PropTypes.object,
};
const ListItem = ({ item, onPress, renderRight }) => {
    const {
        container,
        avatar,
        titleWrapper,
        titleStyle,
        subtitleStyle,
        leftWrapper,
        rightWrapper
    } = styles;
    const maxTitleLimit = 18;
    const maxStatusLimit = 30;

    return (
        <TouchableOpacity
            style={container}
            onPress={onPress}
        >
            <View style={leftWrapper}>
                <Image
                    source={{ uri: item.avatar }}
                    style={avatar}
                />
                <View style={titleWrapper}>
                    <Text style={titleStyle}>
                        {
                            item.name.length > maxStatusLimit ?
                                item.name.substring(0, maxTitleLimit - 3) + '...' :
                                item.name
                        }
                    </Text>
                    <Text
                        style={subtitleStyle}
                    >
                        {
                            item.status && item.status.length > maxStatusLimit ?
                                item.status.substring(0, maxStatusLimit - 3) + '...' :
                                item.status
                        }
                    </Text>
                </View>
            </View>
            <View style={rightWrapper}>
                {renderRight}
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
    leftWrapper: {
        flex: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    rightWrapper: {
        flex: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 5,
    },
    titleWrapper: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    titleStyle: {
        fontSize: 18,
    },
    subtitleStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)',
    },
};

ListItem.propTypes = propTypes;
export { ListItem };
