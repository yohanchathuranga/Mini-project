import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import firebase from '../database';
console.disableYellowBox = true;
let usersRef = firebase.database().ref('users');
const nav = this.props;
class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  state = {
    user: [],
  };

  static navigationOptions = {
    header: null,
  };

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password,
        )
        .then(res => {
          console.log('User logged-in successfully!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          this.props.navigation.navigate('Dashboard');
        })
        .catch(error => {
          Alert.alert('Warning', 'Error in Login', [
            {
              text: 'ok',
              onPress: () => this.props.navigation.navigate('Login'),
            },
          ]);
        });
    }
  };
  // Navigate() {
  //   usersRef
  //     .orderByChild('uid')
  //     .equalTo(firebase.auth().currentUser.uid)
  //     .once('value')
  //     .then(function(snapshot) {
  //       let data = snapshot.val();
  //       let user = Object.values(data);
  //       console.log(user);

  //       nav.navigation.navigate('Dashboard');

  //       // this.setState({user});
  //     });
  // }

  render() {
    const {heading, input, label, parent, button, preloader} = styles;

    if (this.state.isLoading) {
      return (
        <View style={preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={parent}>
        <Text style={heading}>Login</Text>

        <Text style={label}>Username</Text>
        <TextInput
          style={input}
          placeholder="Username"
          onChangeText={val => this.updateInputVal(val, 'email')}
        />

        <Text style={label}>Password</Text>
        <TextInput
          style={input}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={val => this.updateInputVal(val, 'password')}
        />

        <Button
          style={button}
          color="#3740FE"
          title={'Submit'}
          onPress={_ => this.userLogin()}
        />
      </View>
    );
  }
}
export default Home;
