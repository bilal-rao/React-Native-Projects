import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import ADDGROUP from '../../store/actions/addGroup';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, Title, CardItem, Thumbnail, Button, Icon, Left, Body, H1, H3 } from 'native-base';

var { height, width } = Dimensions.get('window');

class Invitation extends React.Component {
    constructor() {
        super();
        this.state = {
            postKey: '',
            randomKey: ''
        }
    }
    componentWillMount() {
        this.props.dispatchPostKey();
    }
    makeKey(startingPoint) {
        this.setState({ postKey: this.props.invitationKey[this.props.navigation.state.params.indexNo].postKey })
        var endingPoint = startingPoint + 6;
        var randKey = this.state.postKey.slice(startingPoint, endingPoint);
        this.setState({
            randomKey: randKey
        })
    }
    render() {
        var randomNum = Math.ceil((Math.random() * 10) + 4);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invitation Code</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={{ marginTop: height / 4 }}>
                        <View style={{ width: width, height: height / 3, alignItems: 'center' }} >
                            <Text>Share this invite code with the</Text>
                            <Text>people you want in your Circle:</Text>
                            <H1 style={{ color: '#00cc33' }}>{'\n'}{this.state.randomKey}{'\n'}</H1>
                         
                            <View style={{ alignItems: 'center', textAlign: 'center' }}>
                                <Button rounded  onPress={() => this.makeKey(randomNum)} style={{ width: 120, justifyContent: 'center'}}>
                                        <Text style={{ textAlign: 'center', color: '#ffffff'}}> Done</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        invitationKey: state.addGroupReducer.key
    }
}

function mapDisptachToProps(dispatch) {
    return {
        dispatchPostKey: () => dispatch(ADDGROUP.generateKey())
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Invitation);



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center'
    },
})