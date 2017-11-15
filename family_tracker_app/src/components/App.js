import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapViews from './mapView/mapView.js';
import { TabNavigator } from 'react-navigation';
import { Drawer, Icon, Container, Header, Left, Body, Right, Title, Button, Content } from 'native-base';
import SideBar from './sideBar/sideBar';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})


export default class App extends React.Component {
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigation={this.props.navigation} navigator={this.navigator} />}
                onClose={() => this.closeDrawer()} >
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={this.openDrawer.bind(this)}>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Family tracker App</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={()=>this.props.navigation.navigate('joinCircle')} />
                        </Right>
                    </Header>
                    <Content>
                        <MapViews data={this.props}/>
                    </Content>
                </Container>
            </Drawer>
        );
    }
}