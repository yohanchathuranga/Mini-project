import React, {Component, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from '../database';
import moment from 'moment';
console.disableYellowBox = true;

let addNotification = (title, description, date) => {
  firebase
    .database()
    .ref('/notifications')
    .push({
      title: title,
      description: description,
      date: date,
    })
    .then(res => {})
    .catch(error => {
      Alert.alert('Warning', 'Error in adding Notifications', [
        {
          text: 'ok',
          onPress: () => this.props.navigation.navigate('AddNotifications'),
        },
      ]);
    });
};

class AddNotification extends Component {
  state = {
    title: '',
    description: '',
    date: '',
  };
  constructor(props) {
    super(props);
    //Initialization of the state to store the selected file related attribute
    this.state = {
      singleFile: '',
      // fileURI: useState(null),
      // setfileURI: useState(null),
    };
  }

  getCurrentDate = () => {
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD  HH:MM');
    return date;
  };

  handleSubmit = () => {
    const date = this.getCurrentDate();
    addNotification(this.state.title, this.state.description, date);
    Alert.alert('Success', 'Notification saved successfully', [
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
        <Text style={styles.title}>Notification Form</Text>
        <Text>Title</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'title')}
        />
        <Text>Description</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={val => this.updateInputVal(val, 'description')}
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
export default AddNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    padding: 35,
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
