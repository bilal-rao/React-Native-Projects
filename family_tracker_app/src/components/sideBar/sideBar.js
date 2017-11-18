import React from 'react';
import { Container, Header, Content, List, ListItem, Text, Separator } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import AUTHUSER from '../../store/actions/authUser';
import { connect } from 'react-redux';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#234567'
    },
    drawerImage: {
        width: 295,
        height: 160
    },
    drawerContent: {
        backgroundColor: '#ffffff'
    },
    textStyle: {
        
    }
})


class SideBar extends React.Component {
    navigateToLogOut() {
        this.props.logOutDispatch();
    }
    render() {
        return (
            <Container>
                <Header style={styles.header} />
                <Content style={styles.drawerContent}>
                    <View last>
                        <Image
                            source={require('../../images/drawerImage.png')}
                            style={styles.drawerImage}
                        />
                    </View>
                    <ListItem last onPress={() => this.props.navigation.navigate('home')}>
                        <Text style={styles.textStyle}>Home</Text>
                    </ListItem>

                    <ListItem last onPress={() => this.props.navigation.navigate('groups')}>
                        <Text>Create Group</Text>
                    </ListItem>
                    <ListItem last onPress={() => this.props.navigation.navigate('groupList')}>
                        <Text>My Groups</Text>
                    </ListItem>
                    <ListItem last onPress={() => this.props.navigation.navigate('joinCircle')}>
                        <Text>Join Group</Text>
                    </ListItem>
                    <ListItem last onPress={this.navigateToLogOut.bind(this)}>
                        <Text>LogOut</Text>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOutDispatch: () => dispatch(AUTHUSER.signout())
    }
}


export default connect(() => ({}), mapDispatchToProps)(SideBar);