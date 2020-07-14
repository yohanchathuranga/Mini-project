import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import firebase from '../database';
console.disableYellowBox = true;
let addUser = (name, age, email, contact_no, department, status) => {
  firebase
    .database()
    .ref('/users')
    .push({
      name: name,
      age: age,
      email: email,
      contact_no: contact_no,
      department: department,
      status: status,
    })
    .catch(error => {
      Alert.alert('Warning', 'Error in adding New User', [
        {
          text: 'ok',
          onPress: () => this.props.navigation.navigate('AddUser'),
        },
      ]);
    });
};

class AddUser extends Component {
  state = {
    name: '',
    age: '',
    email: '',
    contact_no: '',
    department: '',
    status: '',
  };

  handleSubmit = () => {
    addUser(
      this.state.name,
      this.state.age,
      this.state.email,
      this.state.contact_no,
      this.state.department,
      this.state.status,
    );
    Alert.alert('Success', 'User saved successfully', [
      {text: 'ok', onPress: () => this.props.navigation.navigate('Dashboard')},
    ]);
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Employee Form</Text>
        <Text>Name</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'name')}
          value={this.state.name}
        />
        <Text>Age</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'age')}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <Text>Contact No</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'contact_no')}
        />
        <Text>Department</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'department')}
        />
        <Text>Status</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'status')}
        />

        <TouchableHighlight
          style={styles.button}
          underlayColor="blue"
          onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    paddingHorizontal: 35,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  userInput: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#3740FE',
    height: 45,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
