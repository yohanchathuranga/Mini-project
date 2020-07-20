import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Colors, IconButton,Appbar} from 'react-native-paper';
import firebase from '../database';
let usersRef = firebase.database().ref('users');
console.disableYellowBox = true;
class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
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
      })
      .catch(error => {
        Alert.alert('Warning', 'Error in Delete', [
          {
            text: 'ok',
            onPress: () => this.props.navigation.navigate('UserDetails'),
          },
        ]);
      });
  }
  deleteEvent(email) {
    Alert.alert('Warning', 'Do you want to delete this User', [
      {
        text: 'Yes',
        onPress: () => this.deleteUser(email),
      },
      {
        text: 'No',
        onPress: () => this.props.navigation.navigate('EmpList'),
      },
    ]);
  }
  editUser() {
    this.setState({update: true});
  }
  updateUser = () => {
    firebase
      .database()
      .ref('users/' + this.state.id)
      .update({
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
        contact_no: this.state.contact_no,
        department: this.state.department,
        status: this.state.status,
      })
      .then(res => {
        this.setState({
          id: '',
          name: '',
          age: '',
          email: '',
          contact_no: '',
          department: '',
          status: '',
          update: '',
        });
        Alert.alert('Success', 'User Updated successfully', [
          {
            text: 'ok',
            onPress: () => this.props.navigation.navigate('UserDetails'),
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Warning', 'Error in Updating', [
          {
            text: 'ok',
            onPress: () => this.props.navigation.navigate('UserDetails'),
          },
        ]);
      });
  };
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
    if (this.state.id == '') {
      this.setState({
        id: id,
        name: name,
        age: age,
        email: this.props.navigation.getParam('email', 'email'),
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
            onPress={this.updateUser}>
            <Text style={styles.buttonText}>Update</Text>
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
            <Text style={styles.detail}>Age   :   {age}</Text>
            <Text style={styles.detail}>Email   :   {email}</Text>
            <Text style={styles.detail}>Contact No   :   {contact_no}</Text>
            <Text style={styles.detail}>Department   :    {department}</Text>
            <Text style={styles.detail}>Position   :    {status}</Text>
          </View>

          <Appbar style={styles.bottombar}>
            <Appbar.Action
              icon="settings"
              onPress={() => this.editUser()}
              />
              <Appbar.Action
                icon="delete"
                onPress={()=>this.deleteEvent(email)}
              />
          </Appbar>
          {/* <View style={styles.bottom}>
            <IconButton
              icon="settings"
              color={Colors.blue600}
              size={20}
              onPress={() => this.editUser()}
            />

            <IconButton
              icon="delete"
              color={Colors.blue600}
              size={20}
              onPress={() => this.deleteEvent(email)}
            />
          </View> */}
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
    paddingHorizontal: 35,
  },
  header: {
    alignItems: 'flex-start',
    height: 200,
    backgroundColor: '#3d77ff',
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
    justifyContent:'space-around'
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
  bottombar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent:'space-around',
    backgroundColor:'#3d77ff',
  },
});
