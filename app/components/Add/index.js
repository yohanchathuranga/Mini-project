import React, {Component} from 'react';
import {View, StyleSheet,Alert} from 'react-native';
import {List,IconButton,Colors,Divider} from 'react-native-paper';
import Notifications from '../Notifications'
import firebase from '../database'
console.disableYellowBox = true;

class Add extends Component {
  static navigationOptions =({navigation}) =>{
    return {
    headerRight: (
      <IconButton
        icon="logout"
        color={Colors.blue600}
        size={20}
        onPress={navigation.getParam('signOut')}
      />
    ),
    }
  };
  componentDidMount() {
    this.props.navigation.setParams({ signOut: this.signOut});
  }
  signOut=()=>{
    firebase.auth().signOut(),
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <List.Item
            title="New Employee"
            onPress={() => this.props.navigation.navigate('AddUser')}
          />
          <Divider/>
          <List.Item
            title=" New Notifications"
            onPress={() => this.props.navigation.navigate('AddNotifications')}
          />
          <Divider/>
          <List.Item
            title="Test"
            onPress={() => this.props.navigation.navigate('Test')}
          />
        </View>

      </View>
    );
  }
}
export default Add;
const styles = StyleSheet.create({
  end: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  top: {
    justifyContent: 'space-around',
    backgroundColor: '#3d77ff',
  },
});
