import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import ADDGROUP from '../../store/actions/addGroup';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, Card, Title, Spinner, CardItem, Thumbnail, Text, Button, Left, Body, Footer, FooterTab } from 'native-base';





function mapStateToProps(state) {
    return {
        members: state.addGroupReducer.member,
        adminName: state.addGroupReducer.admin,
        isFetch: state.addGroupReducer.isFetchMembers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchMembers: (index) => dispatch(ADDGROUP.fetchMembers(index))
    }
}


var { height } = Dimensions.get('window');
class AdminProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: "",
            memberList: [],
            fetch: ""
        }
    }
    // componentDidMount() {
    //     // this.props.fetchMembers(this.props.groupList[this.props.navigation.state.params.indexNo].members)
    //     // this.props.fetchMembers(this.props.navigation.state.params.indexNo)
    // }

    componentDidMount() {
        this.props.fetchMembers(this.props.navigation.state.params.indexNo)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            memberList: nextProps.members,
            admin: nextProps.adminName,
            fetch: nextProps.isFetch
        })
    }
    componentWillUnmount() {
        this.setState({
            memberList: '',
            admin: '',
            fetch: ''
        })
    }
    render() {
        console.log()
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon 
                            name='arrow-back'
                            color="#ffffff"
                            size={25}
                             />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                </Header>
                <Content>
                    {this.state.fetch ?
                        <View>
                            <Card style={{ flex: 0 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: '' }} />
                                        <Body>
                                            <Text>Admin</Text>
                                            <Text note>{this.state.admin}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                            <Card style={{ flex: 0 }}>
                                {this.state.memberList.map((data, index) => (
                                    <CardItem key={index}>
                                        <Icon
                                            name="person"
                                            size={25}
                                        />
                                        <Text>{data.uName}</Text>
                                    </CardItem>
                                ))}

                            </Card>
                        </View>
                        :
                        <View style={{ marginTop: height / 3 }}>
                            <Spinner />
                        </View>
                    }
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate('inviteCode', { indexNo: this.props.navigation.state.params.indexNo })} vertical>
                            <Icon
                                name="add"
                                color="#ffffff"
                                size={25}
                            />
                            <Text>Invite</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('home', { data: this.state.memberList })} vertical>
                            <Icon
                                name="location-on"
                                color="#ffffff"
                                size={25}
                            />
                            <Text>Tracking</Text>
                        </Button>
                        {/* <Button vertical active>
                            <Icon active name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button> */}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);

