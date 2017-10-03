import React from 'react';
import { ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Container, Header, Content, List, ListItem, Item, Input, Text, Spinner, Alert, Icon, View, SwipeRow, Button, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';
import PatientsRecord from '../actions/patientAction';


function mapStateToProps(state) {
    return {
        patient: state.data,
        getData: state.getData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchingDispatch: () => dispatch(PatientsRecord.fetchData()),
        removeDispatch: (index) => dispatch(PatientsRecord.removePatient(index))
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            date: ''
        }
    }
    componentDidMount() {
        this.props.fetchingDispatch();
    }
    static navigationOptions = {
        title: 'Patient Tracker App'
    }
    searchByName = (obj) => { 
        return ((obj.pName.search(this.state.search) >= 0) && (obj.appDate.search(this.state.date) >= 0) ) ? true : false
    }
    cancel(){
        this.setState({date : ''})
    }
    render() {
        const navigate = this.props.navigation.navigate;
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={(search) => { this.setState({ search }) }} />
                       {this.state.date ? <Icon name="arrow-back" onPress={this.cancel.bind(this)} /> : <Icon name="ios-people"  /> } 
                        <DatePicker
                            style={{ width: 30 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="MM/DD/YY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    <ScrollView>
                        <Content scrollEnabled={false}>
                            {
                                !this.props.getData ?
                                    <Spinner color='blue' />
                                    :
                                    <View>
                                        {this.props.patient ?
                                            this.props.patient.filter(this.searchByName).map((data, index) => (
                                                <SwipeRow
                                                    key={index}
                                                    leftOpenValue={75}
                                                    rightOpenValue={-75}
                                                    left={
                                                        <Button success onPress={() => alert('Patient Name : ' + data.pName + '\n' + 'Patient Disease : ' + data.pDisease + '\n' + 'Appointment Date : ' + data.appDate+ '\n' + 'Medicine :' + data.medicine+ '\n'+ 'Dr.Name :'+data.drName)}>
                                                            <Icon active name="add" />
                                                        </Button>
                                                    }
                                                    body={
                                                        <View>
                                                            <Text>{data.pName}</Text>
                                                        </View>
                                                    }
                                                    right={
                                                        <Button danger onPress={() => this.props.removeDispatch(index)}>
                                                            <Icon active name="trash" />
                                                        </Button>
                                                    }
                                                />
                                            ))
                                            :
                                            alert('There is no Record in System!!!')
                                        }
                                    </View>
                            }
                        </Content>
                    </ScrollView>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => { navigate('addPatient') }}>
                            <Text>Add Patient</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
