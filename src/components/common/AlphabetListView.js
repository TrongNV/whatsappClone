import React, { Component, PropTypes } from 'react';
import ReactNative, {
    View,
    Text,
    ListView,
    NativeModules,
    Platform
} from 'react-native';
import merge from 'merge';
import SectionHeader from './SectionHeader';
import SectionList from './SectionList';

const { UIManager } = NativeModules;

class AlphabetListView extends Component {
    static propTypes = {
        enableEmptySections: PropTypes.bool,
        data: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]).isRequired,
        getSectionTitle: PropTypes.func,
        getSectionListTitle: PropTypes.func,
        compareFunction: PropTypes.func,
        renderRow: PropTypes.func,
        renderHeader: PropTypes.func,
        renderFooter: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderSectionHeader: PropTypes.func,
        onScroll: PropTypes.func,
        onEndReached: PropTypes.func,
        onEndReachedThreshold: PropTypes.number,
        style: PropTypes.object,
        hideSectionList: PropTypes.bool,
        hideSectionHeader: PropTypes.bool,
        useDynamicHeights: PropTypes.bool,
        sectionListStyle: PropTypes.object,
        rowHeight: PropTypes.number.isRequired,
        sectionHeaderHeight: PropTypes.number,
        headerHeight: PropTypes.number,
        footerHeight: PropTypes.number,
        contentOffset: PropTypes.object,
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            }),
            offsetY: 0
        };

        // this.renderSectionHeader = this.renderSectionHeader.bind(this);
        // this.renderRow = this.renderRow.bind(this);
        // this.renderSeparator = this.renderSeparator.bind(this);
        // this.renderHeader = this.renderHeader.bind(this);
        // this.renderFooter = this.renderFooter.bind(this);

        this.onScroll = this.onScroll.bind(this);
        this.onScrollAnimationEnd = this.onScrollAnimationEnd.bind(this);
        this.scrollToSection = this.scrollToSection.bind(this);
    }

    componentWillMount() {
        this.calculateTotalHeight();
    }

    componentDidMount() {
        this.containerHeightTimer = setTimeout(() => {
            UIManager.measure(ReactNative.findNodeHandle(this.refs.view), (x, y, w, h) => {
                this.containerHeight = h;
            });
        }, 0);
        if (this.props.contentOffset !== undefined) {
            if (Platform.OS === 'android') {
                this.contentOffsetTimer = setTimeout(() => {
                    this.refs.listview.scrollTo(this.props.contentOffset);
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data !== this.props.data) {
            this.calculateTotalHeight(nextProps.data);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.containerHeightTimer);
        this.contentOffsetTimer && clearTimeout(this.contentOffsetTimer);
    }

    onScroll(e) {
        const offsetY = e.nativeEvent.contentOffset.y;
        if (this.props.updateScrollState) {
            this.setState({
                offsetY
            });
        }

        this.props.onScroll && this.props.onScroll(e);
    }


    onEndReached() {
        console.log('onEndReached', this);
    }

    onScrollAnimationEnd(e) {
        if (this.props.updateScrollState) {
            this.setState({
                offsetY: e.nativeEvent.contentOffset.y
            });
        }
    }

    calculateTotalHeight(data) {
        data = data || this.props.data;

        if (Array.isArray(data)) {
            return;
        }

        this.sectionItemCount = {};
        this.totalHeight = Object.keys(data)
            .reduce((carry, key) => {
                const itemCount = data[key].length;
                carry += itemCount * this.props.rowHeight;
                carry += this.props.sectionHeaderHeight || 0;
                carry += this.props.footerHeight || 0;

                this.sectionItemCount[key] = itemCount;

                return carry;
            }, 0);
    }

    scrollToSection(section) {
        let y = 0;
        const headerHeight = this.props.headerHeight || 0;
        y += headerHeight;

        const rowHeight = this.props.rowHeight;
        let sectionHeaderHeight = this.props.sectionHeaderHeight;

        let keys = Object.keys(this.props.data);
        if (typeof (this.props.compareFunction) === 'function') {
            keys = keys.sort(this.props.compareFunction);
        }
        const index = keys.indexOf(section);

        let numcells = 0;
        for (let i = 0; i < index; i++) {
            numcells += this.props.data[keys[i]].length;
        }

        sectionHeaderHeight *= index;
        y += (numcells * rowHeight) + sectionHeaderHeight;
        const maxY = this.totalHeight - (this.containerHeight + headerHeight);
        y = y > maxY ? maxY : y;
        this.refs.listview.scrollTo({ x: 0, y, animated: true });
        this.props.onScrollToSection && this.props.onScrollToSection(section);
    }

    renderSectionList(sections, data) {
        if (this.props.hideSectionList) {
            return;
        }
        return (
            <SectionList
                sections={sections}
                data={data}
                onSectionSelect={this.scrollToSection}
            />
        );
    }

    renderSectionHeader = (sectionData, sectionID) => {
        if (this.props.hideSectionHeader) {
            this.sectionHeaderHeight = 0;
            return null;
        }

        const updateTag = this.props.useDynamicHeights ? this.updateTagInSectionMap : null;
        const title = this.props.getSectionTitle ?
            this.props.getSectionTitle(sectionID) :
            sectionID;
        return (
            <SectionHeader
                ref={`sectionHeader${sectionID}`}
                title={title}
                sectionID={sectionID}
                sectionData={sectionData}
                updateTag={updateTag}
            />
        );
    }

    render() {
        const { data } = this.props;
        const dataIsArray = Array.isArray(data);
        let sectionList;
        let renderSectionHeader;
        let dataSource;
        const sections = Object.keys(data);

        if (dataIsArray) {
            dataSource = this.state.dataSource.cloneWithRows(data);
        } else {
            sectionList = this.renderSectionList(sections, data);
            renderSectionHeader = this.renderSectionHeader;
            dataSource = this.state.dataSource.cloneWithRowsAndSections(data, sections);
        }
        let props = merge(this.props, {
            onScroll: this.onScroll,
            onScrollAnimationEnd: this.onScrollAnimationEnd,
            onEndReached: this.props.onEndReached,
            onEndReachedThreshold: this.props.onEndReachedThreshold,
            dataSource,
            renderSectionHeader,
        });

        props.style = void 0;
        if (this.props.renderHeader !== undefined) {
            props = merge(props, {
                renderHeader: this.props.renderHeader
            });
        }
        if (this.props.renderFooter !== undefined) {
            props = merge(props, {
                renderFooter: this.props.renderFooter
            });
        }
        if (this.props.renderRow !== undefined) {
            props = merge(props, {
                renderRow: this.props.renderRow
            });
        }

        return (
            <View ref="view" style={[styles.container, this.props.style]}>
                <ListView ref="listview" {...props} />
                {sectionList}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    }
};

export { AlphabetListView };
