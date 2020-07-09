import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import firebase from '../database';
let usersRef = firebase.database().ref('users');
console.disableYellowBox = true;
class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      email: '',
      contact_no: '',
      department: '',
      status: '',
      update: false,
    };
  }

  deleteUser(email) {
    console.log(email);
    usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(child) {
          child.ref.remove();
          console.log('Removed!');
          this.props.navigation.navigate('EmpList');
        });
      });
  }

  editUser() {
    this.setState({update: true});
  }
  updateUser(email) {
    console.log(email);
    usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(function(snapshot) {
        snapshot.forEach(function(child) {
          child.ref.update({});
          console.log('Updated!');
          this.props.navigation.navigate('EmpList');
        });
      });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    const id = this.props.navigation.getParam('id', 'id');
    const name = this.props.navigation.getParam('name', 'name');
    const age = this.props.navigation.getParam('age', 'age');
    const email = this.props.navigation.getParam('email', 'email');
    const contact_no = this.props.navigation.getParam(
      'contact_no',
      'contact_no',
    );
    const department = this.props.navigation.getParam(
      'department',
      'department',
    );
    const status = this.props.navigation.getParam('status', 'status');
    if (this.state.name == '') {
      this.setState({
        name: name,
        age: age,
        email: email,
        contact_no: contact_no,
        department: department,
        status: status,
      });
    }
    

    if (this.state.update == true) {
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
            value={this.state.age}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.userInput}
            onChangeText={val => this.updateInputVal(val, 'email')}
            value={this.state.email}
          />
          <Text>Contact No</Text>
          <TextInput
            style={styles.userInput}
            onChangeText={val => this.updateInputVal(val, 'contact_no')}
            value={this.state.contact_no}
          />
          <Text>Department</Text>
          <TextInput
            style={styles.userInput}
            onChangeText={val => this.updateInputVal(val, 'department')}
            value={this.state.department}
          />
          <Text>Status</Text>
          <TextInput
            style={styles.userInput}
            onChangeText={val => this.updateInputVal(val, 'status')}
            value={this.state.status}
          />

          <TouchableHighlight
            style={styles.button}
            underlayColor="blue"
            onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.containeruser}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.detail}>Age : {age}</Text>
            <Text style={styles.detail}>Email:{email}</Text>
            <Text style={styles.detail}>Contact No :{contact_no}</Text>
            <Text style={styles.detail}>Department :{department}</Text>
            <Text style={styles.detail}>Position :{status}</Text>
          </View>
          <View style={styles.bottom}>
            <IconButton
              icon="edit"
              color={Colors.blue600}
              size={20}
              onPress={() => this.editUser()}
            />

            <IconButton
              icon="delete"
              color={Colors.blue600}
              size={20}
              onPress={() => this.deleteUser(email)}
            />
          </View>
        </View>
      );
    }
  }
}

export default UserDetails;
const styles = StyleSheet.create({
  containeruser: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal:35,
  },
  header: {
    alignItems: 'flex-start',
    height: 200,
    backgroundColor: '#32a889',
    fontSize: 40,
    justifyContent: 'flex-end',
  },
  body: {
    paddingLeft: 20,
  },
  name: {
    fontSize: 40,
    color: 'white',
  },
  detail: {
    lineHeight: 50,
    fontSize: 20,
  },
  bottom: {
    flexDirection: 'row',
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
