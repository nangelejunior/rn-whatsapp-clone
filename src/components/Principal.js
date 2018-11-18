import React, { Component } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';

import TabBarMenu from './TabBarMenu';
import Contatos from './Contatos';
import Conversas from './Conversas';

export default class Principal extends Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Conversas' },
            { key: 'second', title: 'Contatos' },
        ],
    };

    handleIndexChange = index => this.setState({ index });

    renderTabBar = props => <TabBarMenu {...props} />;

    renderScene = SceneMap({
        first: Conversas,
        second: Contatos,
    });

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.handleIndexChange}
            />
        );
    }
}
