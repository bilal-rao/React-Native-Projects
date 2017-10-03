import React from 'react';
import { AsyncStorage, Text, View, TextInput, Button , Alert} from 'react-native';
import { connect } from 'react-redux';
import PatientsRecord from '../store/actions/patientAction';


        function mapDispatchToProps(dispatch) {
            return {
                patientDispatch : (userObj) => dispatch(PatientsRecord.addPatient(userObj)),
                fetchingDispatch: () => dispatch(PatientsRecord.fetchData()),                
            }
        }


class AddPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pName: '',
            pDisease: '',
            header: this.props.navigation
        }

    }

    addPatient() {
        if(this.state.name == '' || this.state.disease == ''|| this.state.medicine == '' || this.state.drName == '' || this.state.date == ''){
            Alert.alert('You must have to fill all fields ')
        }
        else{
            var userObj = {
                patientName: this.state.name,
                patientDisease: this.state.disease,
                medicine: this.state.medicine,
                drName: this.state.drName,
                date : new Date().toLocaleDateString()
              }
            this.props.patientDispatch(userObj);
            const {navigate} = this.props.navigation;
            navigate('Home');
            this.props.fetchingDispatch();
        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Patient Details'
    })
    render(){
        return (
            <View>
                <TextInput
                    onChangeText = {(name)=>{this.setState({name})}}
                    placeholder='Patient Name' 
                />
                <TextInput
                    onChangeText={(disease)=>{this.setState({disease})}}
                    placeholder='Patient Disease'
                />
                <TextInput
                    onChangeText={(medicine)=>{this.setState({medicine})}}
                    placeholder='Medicine'
                />
                <TextInput
                    onChangeText={(drName)=>{this.setState({drName})}}
                    placeholder='Dr.Name'
                />
                <Button style={{ width: 150 }} onPress={this.addPatient.bind(this)}
                    title="Add Patient"
                />             
            </View>
        );
    }
}


export default connect(()=>({}), mapDispatchToProps)(AddPatient);