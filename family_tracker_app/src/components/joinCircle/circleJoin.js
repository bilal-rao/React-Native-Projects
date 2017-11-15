import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Button, Text, Left, Title, Body } from 'native-base';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import ADDGROUP from '../../store/actions/addGroup';
import USERINFO from '../../store/actions/usersInfo';
import { View, Dimensions, TextInput } from 'react-native';

var { height, width } = Dimensions.get('window');

class JoinCircle extends Component {
    constructor() {
        super();
        this.state = {
            inviteCode: '',
            circleList: []
        }
    }
    componentWillMount() {
        firebase.database().ref('Circle/').on('child_added', (snap) => {
            var obj = snap.val();
            console.log(obj)
            var circleList = this.state.circleList;
            circleList.push(obj);
            this.setState({
                circleList
            })
        })
    }
    joinDear() {
        this.props.matchRandomKey(this.state.inviteCode);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Join a Circle</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>Ask the Circle Creator for their Code..</Text>
                    
                    <View style={{ width: width - 200 }}>
                        {/* <Item> */}
                            <TextInput
                                maxLength={6}
                                style={{textAlign: 'center', color: '#00cc33', fontWeight: 'bold'}}
                                placeholder='Enter your invite code'
                                onChangeText={(inviteCode) => { this.setState({ inviteCode }) }}
                            />
                        {/* </Item> */}
                    </View>
                    <View>
                        <Text>{'\n'}</Text>
                        {this.state.inviteCode.length ===  6 ?
                        <Button rounded success onPress={this.joinDear.bind(this)}>
                            <Text>Submit</Text>
                        </Button> 
                        :
                        <Button disabled rounded  onPress={this.joinDear.bind(this)}>
                            <Text>Submit</Text>
                        </Button> 
                        }
                      
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        matchRandomKey: (randomKey) => dispatch(ADDGROUP.matchKey(randomKey)),
    }
}

export default connect(() => ({}), mapDispatchToProps)(JoinCircle);
