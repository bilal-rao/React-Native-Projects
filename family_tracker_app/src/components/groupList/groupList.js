import React from 'react';
import { Container, Header, Spinner, Content, List, ListItem, Separator, Button, Text, Item, Input, CardItem, Left, Body, Title, Card, Icon } from 'native-base';
import ADDGROUP from '../../store/actions/addGroup';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { View, Dimensions } from 'react-native';

var { height, width } = Dimensions.get('window');

class GroupList extends React.Component {
    componentDidMount() {
        this.props.fetchGroups();
    }
    render() {
        var data = this.props.groupList
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>GroupList</Title>
                    </Body>
                </Header>
                <Content>
                    {this.props.isFetch ?
                        data.length === 0 ?
                            <View style={{ marginTop: height/4}}>
                                <Card>
                                    <View style={{ width: width, height: height / 3, justifyContent: 'center', alignItems: 'center'  }}>
                                        <Text style={{textShadowRadius:2}}>You dn't Have any Circle</Text>
                                    </View>
                                </Card>
                            </View>
                            :
                            this.props.groupList.map((data, index) => (
                                <Card key={index}>
                                    <CardItem>
                                        <Icon active name="md-person" />
                                        <Text onPress={() => this.props.navigation.navigate('adminProfile', { indexNo: index })}>{data}</Text>
                                    </CardItem>
                                </Card>
                            ))
                        :
                        <Spinner />
                    }


                </Content>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGroups: () => dispatch(ADDGROUP.fetchCircle()),
    }
}
function mapStateToProps(state) {
    return {
        groupList: state.addGroupReducer.circles,
        isFetch: state.addGroupReducer.isFetchGroup
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
