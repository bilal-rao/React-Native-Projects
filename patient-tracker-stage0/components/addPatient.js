import React from 'react';
import { AsyncStorage, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import PatientsRecord from '../store/actions/patientAction';


        function mapDispatchToProps(dispatch) {
            return {
                patientDispatch : (PatientDetails) => dispatch(PatientsRecord.addPatient(PatientDetails)),
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
        var PatientDetails = {
            pName: this.state.name,
            pDisease: this.state.disease,
            appDate: new Date().toLocaleDateString(),
            medicine : this.state.medicine,
            drName : this.state.drName
        }
        this.props.patientDispatch(PatientDetails);
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