import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firebase from '../database';
console.disableYellowBox = true;

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      email: '',
      contact_no: '',
      department: '',
      status: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password.trim(),
        )
        .then(res => {
          res.user.updateProfile({
            displayName: this.state.name,
          });

          if (res.user.uid) {
            firebase
              .database()
              .ref('/users')
              .push({
                uid: res.user.uid,
                name:this.state.name,
                age:this.state.age,
                email: this.state.email,
                contact_no:this.state.contact_no,
                department:this.state.department,
                status:this.state.status
              });

              // firebase.firestore()
              // .collection('THREADS')
              // .doc('zyDcp1PVyiIvZQQTvtJh')
              // .add({
              //   name: this.state.name
              // })
          }
         
          console.log('User registered successfully!');
          this.setState({
            isLoading: false,
            name: '',
            age: '',
            email: '',
            contact_no: '',
            department: '',
            status: '',
            password: '',
          });
          Alert.alert('Success', 'User  successfully', [
            {text: 'ok', onPress: () => this.props.navigation.navigate('Dashboard')},
          ]);
        })
        .catch(error => {
          console.log(error)
          Alert.alert('Warning', 'Error in SignUp'+error, [
            {
              text: 'ok',
              onPress: () => this.props.navigation.navigate('SignUp'),
            },
          ]);
          this.props.navigation.navigate('SignUp')
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.name}
          onChangeText={val => this.updateInputVal(val, 'name')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Age"
          value={this.state.age}
          onChangeText={val => this.updateInputVal(val, 'age')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Contact No"
          value={this.state.contact_no}
          onChangeText={val => this.updateInputVal(val, 'contact_no')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Department"
          value={this.state.department}
          onChangeText={val => this.updateInputVal(val, 'department')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Status"
          value={this.state.status}
          onChangeText={val => this.updateInputVal(val, 'status')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={val => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Sign up"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
