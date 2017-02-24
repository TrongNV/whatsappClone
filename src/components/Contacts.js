import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import AtoZListView from 'react-native-atoz-listview';
import { Search } from './common';

class Contacts extends Component {

    state = {
        refreshing: false
    }

    renderHeader = () => {
        return (
            <View
                ref="header"
                style={{
                    height: 40,
                    paddingLeft: 15,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '200'
                    }}
                >
                    My Number:
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '400'
                    }}
                >
                    +84982808065
                </Text>
            </View>
        );
    }

    renderRow = (item, sectionID, index) => {
        return (
            <TouchableHighlight
                onPress={() => console.log('View contact Details')}
                underlayColor="rgba(0, 0, 0, 0.2)"
                style={[{
                    height: 50,
                    paddingLeft: 15,
                    justifyContent: 'center',
                }]}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '300',
                            color: '#000'
                        }}
                    >
                        {item.name}
                    </Text>
                    {item.status !== '' ?
                        <Text
                            style={{
                                marginTop: 3,
                                fontSize: 12,
                                fontWeight: '100',
                                color: '#000'
                            }}
                        >
                            {item.status}
                        </Text>
                        : <View />
                    }
                </View>
            </TouchableHighlight>
        );
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View
                style={{
                    backgroundColor: '#f7f7f7',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: 15
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: 'grey'
                    }}
                >{sectionID}</Text>
            </View>
        );
    }

    renderSeparator = (sectionId, rowID) => {
        return (
            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#ccc',
                    marginLeft: 15,
                }}
                key={`${sectionId}-${rowID}`}
            />
        );
    }

    renderFooter = () => {
        return (
            <View
                style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0.5,
                    borderTopColor: '#ccc',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#ccc',
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '300',
                        color: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                    100 Contacts
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Search />
                <AtoZListView
                    data={this.props.contacts}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    sectionHeaderHeight={40}
                    renderHeader={this.renderHeader}
                    headerHeight={40}
                    rowHeight={50}
                    renderFooter={this.renderFooter}
                    footerHeight={50}
                    onEndReached={() => console.log('onEndReached')}
                    refreshControl={
                        <RefreshControl
                            title="Release to refresh"
                            progressBackgroundColor="#ddd"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({
                                    refreshing: true
                                });
                                console.log('refreshing');
                                setTimeout(() => {
                                    console.log('refreshed');
                                    this.setState({
                                        refreshing: false
                                    });
                                }, 1000);
                            }}
                        />
                    }
                />
            </View>
        );
    }
}

export default connect(state => ({
    contacts: state.contactsGroup
}))(Contacts);
