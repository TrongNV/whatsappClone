import React, { PropTypes, Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    PanResponder,
    Animated
} from 'react-native';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 2;
const PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;

const propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    renderRight: PropTypes.object,
};
class ListItemSwipe extends Component {
    componentDidMount() {

    }

    render() {
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
    }
}

ListItemSwipe.propTypes = propTypes;
export { ListItemSwipe };
