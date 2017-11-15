import React from 'react';
import { Container, Header, Content, List, ListItem, Separator, Button, Text, Right, Item, Input, CardItem, Left, Body, Title, Card, Icon, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { View, TouchableOpacity } from 'react-native';
import ADDGROUP from '../../store/actions/addGroup';


class MemberList extends React.Component {
    constructor() {
        super();
        this.state = {
            circleName: '',
            membersList: '',
            listOfData: ''
        }
    }
    render() {
        console.log('lat',this.props.membersList)
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>MemberList</Title>
                    </Body>
                </Header>
                <Content>
                    <View>
                        {this.props.membersList ?
                            this.props.membersList.map((data, index) => (
                                <Card key={index} >
                                    <CardItem>
                                        <Icon active name="md-person" />
                                        <Text>{data.uName}</Text>
                                    </CardItem>
                                </Card>
                            ))
                            :
                            <View>
                                <Text>There is No Record in Our Database.</Text>
                            </View>
                        }
                    </View>
                </Content>
                <Footer><FooterTab><Button onPress={()=>this.props.navigation.navigate('home' , {data: this.props})}><Text style={{ color: 'white', }}>Wanna Track To Deeds?</Text></Button></FooterTab></Footer>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        membersList: state.addGroupReducer.data
    }
}

export default connect(mapStateToProps)(MemberList);
