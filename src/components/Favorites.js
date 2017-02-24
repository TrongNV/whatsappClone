import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Actions, ActionConst } from 'react-native-router-flux';
import { Item, Divider, Search } from './common';
import { search } from '../actions';

class Favorites extends Component {

    state = {
        searchKeyword: ''
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.listviewTimeout = setTimeout(
                () => this.refs._listView.scrollTo({ x: 0, y: 46 })
                , 0);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    componentWillUnmount() {
        this.listviewTimeout && clearTimeout(this.listviewTimeout);
    }

    onSearchPressed = () => {
        this.props.search(this.state.searchKeyword);
    }

    createDataSource({ favorites }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(favorites);
    }

    renderItem = (item) => {
        return <Item item={item} ref="item" />;
    }

    renderSeparator = (sectionID, rowID) => {
        const section = this.dataSource._dataBlob[sectionID];
        const isLast = rowID === `${section.length - 1}`;
        if (isLast) {
            return;
        }
        return <Divider key={`${sectionID}-${rowID}`} style={styles.divider} />;
    }

    renderHeader = () => {
        return (
            <Search />
        );
    }

    renderFooter = () => {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{this.props.favorites.length} Favorites</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    ref="_listView"
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    contentOffset={{ x: 0, y: 46 }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.contacts
    };
};
const styles = {
    divider: {
        marginLeft: 55,
    },
    rightWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.5)'
    },
    rightIcon: {
        marginLeft: 10,
        color: '#0173fa'
    },
    footerContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)'
    },
    footerText: {
        fontSize: 24,
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight: '300'
    }
};

export default connect(mapStateToProps, {
    search
})(Favorites);
