import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import Favorites from './components/Favorites';
import Calls from './components/Calls';
import CallsTitle from './components/CallsTitle';
import Contacts from './components/Contacts';
import ContactSearch from './components/ContactSearch';
import ContactInfo from './components/ContactInfo';
import Chats from './components/Chats';
import Settings from './components/Settings';

import { TabIcon } from './components/common';

const renderButton = (icon, title, onPress) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {title ? <Text>{title}</Text> : icon}
        </TouchableOpacity>
    );
};

const RouterComponent = () => {
    const {
        navigationBarStyle,
        sceneStyle,
        tabBarStyle,
        titleStyle,
    } = styles;
    return (
        <Router>
            <Scene
                key="root"
                tabs
                tabBarStyle={tabBarStyle}
            >
                <Scene
                    key="favoritesTab"
                    title="Favorites"
                    titleStyle={titleStyle}
                    icon={TabIcon}
                    defaultIcon="ios-star-outline"
                    selectedIcon="ios-star"
                >
                    <Scene
                        key="favorites"
                        component={Favorites}
                        title="Favorites"
                        titleStyle={titleStyle}
                        navigationBarStyle={navigationBarStyle}
                        sceneStyle={sceneStyle}
                        leftTitle="Edit"
                        onLeft={() => console.log('On Left')}
                        rightTitle="Add"
                        onRight={() => Actions.contactSearch()}
                        type="reset"
                    />
                    <Scene
                        key="contactSearch"
                        component={ContactSearch}
                        title="Contacts"
                        titleStyle={titleStyle}
                        rightTitle="Cancel"
                        onRight={() => Actions.favorites()}
                        navigationBarStyle={navigationBarStyle}
                        sceneStyle={sceneStyle}
                        direction="vertical"
                        type="reset"
                        hideTabBar
                    />
                </Scene>
                <Scene
                    key="calls"
                    component={Calls}
                    title="Calls"
                    renderTitle={() => <CallsTitle />}
                    icon={TabIcon}
                    defaultIcon="ios-call-outline"
                    selectedIcon="ios-call"
                    navigationBarStyle={navigationBarStyle}
                    sceneStyle={sceneStyle}
                />
                <Scene
                    key="contactsTab"
                    title="Contacts"
                    titleStyle={titleStyle}
                    icon={TabIcon}
                    defaultIcon="ios-contact"
                    selectedIcon="ios-contact"
                    initial
                >
                    <Scene
                        key="contacts"
                        component={Contacts}
                        title="Contacts"
                        titleStyle={titleStyle}
                        navigationBarStyle={navigationBarStyle}
                        sceneStyle={sceneStyle}
                    />
                    <Scene
                        key="contactInfo"
                        component={ContactInfo}
                        title="Contact Info"
                        navigationBarStyle={navigationBarStyle}
                        sceneStyle={sceneStyle}
                        hideNavBar
                        hideTabBar
                    />
                </Scene>
                <Scene
                    key="chats"
                    component={Chats}
                    title="Chats"
                    titleStyle={titleStyle}
                    icon={TabIcon}
                    defaultIcon="ios-chatbubbles-outline"
                    selectedIcon="ios-chatbubbles"
                    navigationBarStyle={navigationBarStyle}
                    sceneStyle={sceneStyle}
                />
                <Scene
                    key="settings"
                    component={Settings}
                    title="Settings"
                    titleStyle={titleStyle}
                    icon={TabIcon}
                    defaultIcon="ios-cog"
                    selectedIcon="ios-cog"
                    navigationBarStyle={navigationBarStyle}
                    sceneStyle={sceneStyle}
                />
            </Scene>
        </Router>
    );
};

const styles = {
    tabBarStyle: {
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
        height: 60,
        backgroundColor: '#f7f7f7'
    },
    titleStyle: {
        fontWeight: '600'
    },
    navigationBarStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: '#f7f7f7',
        height: 60,
    },
    sceneStyle: {
        marginTop: 60,
    }
};

export default RouterComponent;
