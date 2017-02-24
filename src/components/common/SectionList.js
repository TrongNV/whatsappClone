import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
} from 'react-native';

const returnTrue = () => true;
class SectionList extends Component {
    static propTypes = {
        sections: PropTypes.array.isRequired,
        data: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]).isRequired,
        getSectionListTitle: PropTypes.func,
        renderSection: PropTypes.func,
        onSectionSelect: PropTypes.func,
        style: PropTypes.object,
    }

    constructor(props, context) {
        super(props, context);

        this.detectAndScrollToSection = this.detectAndScrollToSection.bind(this);
        this.resetSection = this.resetSection.bind(this);
        this.onSectionSelect = this.onSectionSelect.bind(this);
        this.lastSelectedIndex = null;
    }

    componentDidMount() {
        this.fixSectionItemMeasure();
    }

    componentDidUpdate() {
        this.fixSectionItemMeasure();
    }

    componentWillUnmount() {
        clearTimeout(this.measureTimer);
    }

    onSectionSelect(sectionID, fromTouch) {
        this.props.onSectionSelect && this.props.onSectionSelect(sectionID);
        if (!fromTouch) {
            this.lastSelectedIndex = null;
        }
    }

    detectAndScrollToSection(e) {
        const ev = e.nativeEvent.touches[0] || e.nativeEvent;
        const targetY = ev.pageY;
        const { y, height } = this.measure;
        if (!y || targetY < y) {
            return;
        }
        let index = Math.floor((targetY - y) / height);
        index = Math.min(index, this.props.sections.length - 1);
        if (this.lastSelectedIndex !== index &&
            this.props.data[this.props.sections[index]].length) {
            this.lastSelectedIndex = index;
            this.onSectionSelect(this.props.sections[index], true);
        }
    }

    fixSectionItemMeasure() {
        const sectionItem = this.refs.sectionItem0;
        if (!sectionItem) {
            return;
        }
        this.measureTimer = setTimeout(() => {
            sectionItem.measure((x, y, width, height, pageX, pageY) => {
                this.measure = {
                    y: pageY,
                    width,
                    height
                };
            });
        }, 0);
    }

    resetSection() {
        this.lastSelectedIndex = null;
    }

    renderSection(section, title, titleStyle) {
        if (this.props.renderSection !== undefined) {
            return this.props.renderSection(section, title);
        }
        return (
            <View style={styles.item}>
                <Text style={titleStyle}>{title}</Text>
            </View>
        );
    }

    render() {
        const sections = this.props.sections.map((section, index) => {
            const title = this.props.getSectionListTitle ? this.props.getSectionListTitle : section;
            const textStyle = this.props.data[section].length ? styles.text : styles.inactiveText;
            const child = this.renderSection(section, title, textStyle);
            return (
                <View key={index} ref={`sectionItem${index}`} pointerEvents="none">
                    {child}
                </View>
            );
        });
        return (
            <View
                ref="sectionList"
                style={[styles.container, this.props.style]}
                onStartShouldSetResponder={returnTrue}
                onMoveShouldSetResponder={returnTrue}
                onResponderGrant={this.detectAndScrollToSection}
                onResponderMove={this.detectAndScrollToSection}
                onResponderRelease={this.detectAndScrollToSection}
            >
                {sections}
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        backgroundColor: 'grey',
        alignItems: 'flex-end',
        justifyContent: 'center',
        right: 0,
        top: 0,
        bottom: 0
    },
    item: {
        padding: 0
    },
    text: {
        fontWeight: '700',
        color: '#0173fa'
    },
    inactiveText: {
        fontWeight: '700',
        color: '#ccc'
    }
};

export default SectionList;
