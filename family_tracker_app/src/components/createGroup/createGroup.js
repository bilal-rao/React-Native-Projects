import React from 'react';
import { Container, Header, Content, List, Footer, ListItem, Separator, Button, Text, Item, Input, Left, Title, Body } from 'native-base';
import ADDGROUP from '../../store/actions/addGroup';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
var { height, width } = Dimensions.get('window');

class CreateGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            circleName: ''
        }
    }
    createGroup() {
        if (this.state.circleName === '') {
            alert('Plz write a circleName!')
        }
        else {
            this.props.addGroup(this.state.circleName);
        }
    }
    render() {

        var w = width / 1.5
        console.log(w)
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon
                                name='md-arrow-back'
                                color="#ffffff"
                                size={25}
                            />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Circle</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <View style={{
                        alignItems: "center",
                    }}>
                        <Icon style={{ fontSize: 80 }} name="ios-add-circle-outline" />
                        <View style={{ alignItems: 'center', width: width - 180 }}>
                            <Item  >
                                <Input style={{ textAlign: 'center' }} onChangeText={(circleName) => this.setState({ circleName })} placeholder="Enter Circle Name" />
                            </Item>
                        </View>
                        <View >
                            <Text>{'\n'}</Text>
                            <Button rounded onPress={this.createGroup.bind(this)}>
                                <Text>Create Circle</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
            // <View>
            //     <Item style={{ alignItems:'center'}}>
            //     <Input placeholder='enter'></Input>
            //     </Item>
            // </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addGroup: (circleName) => dispatch(ADDGROUP.addCircle(circleName)),
    }
}
export default connect(() => ({}), mapDispatchToProps)(CreateGroup);
