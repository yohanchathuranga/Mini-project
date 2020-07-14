import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {List, Appbar} from 'react-native-paper';
import Home from '../Home';

console.disableYellowBox = true;
class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.top}>
          <Appbar.Action
            icon="archive"
            onPress={() => this.props.navigation.navigate('EmpList')}
          />
          <Appbar.Action icon="email" />
          <Appbar.Action
            icon="bell"
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          <Appbar.Action
            icon="delete"
            onPress={() => console.log('Pressed delete')}
          />
        </Appbar>
        <View>
          <List.Item
            title="Employees"
            onPress={() => this.props.navigation.navigate('EmpList')}
          />
          <List.Item
            title="New Employee"
            onPress={() => this.props.navigation.navigate('AddUser')}
          />
          <List.Item
            title="Chat"
            onPress={() => this.props.navigation.navigate('Chat')}
          />
          <List.Item
            title="Notifications"
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          <List.Item
            title=" ADD Notifications"
            onPress={() => this.props.navigation.navigate('AddNotifications')}
          />
          <List.Item
            title=" Test"
            onPress={() => this.props.navigation.navigate('Test')}
          />
          <List.Item
            title=" Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>

        <Home />
      </View>
    );
  }
}
export default Dashboard;
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
