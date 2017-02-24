import React, { Component, PropTypes } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
class Item extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    state = {
        hiddenWidth: 0,
        hiddenHeight: 0,
        translateX: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.timing(
            this.state.translateX, {
                duration: 3000,
                toValue: 1,
                delay: 500
            }
        );
    }

    render() {
        const { item } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateX: this.state.translateX
                            }
                        ]
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log('Delete')}
                    >
                        <Icon name="ios-remove-circle" size={25} color="#a2281f" />
                    </TouchableOpacity>
                </Animated.View>
                <View>
                    <TouchableOpacity
                        onPress={() => console.log('On click')}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flex: 78,
                        }}
                    >
                        <Image
                            source={{ uri: item.avatar }}
                            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 5 }}
                        />
                        <View
                            style={{
                                width: 220,
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, fontWeight: '200' }}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text
                                style={{ fontSize: 13, color: '#ccc' }}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {item.status}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        flex: 22,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        paddingRight: 10
                    }}
                    onPress={
                        () => console.log('AAA')
                    }
                >
                    <Text style={{ fontSize: 13, color: '#ccc' }}>
                        {item.phone.type}
                    </Text>
                    <Icon
                        name="ios-information-circle-outline"
                        size={24}
                        color="#0173fa"
                        style={{ marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View >
        );
    }
}

export { Item };
