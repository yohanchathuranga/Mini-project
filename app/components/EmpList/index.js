import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import firebase from '../database';
import UserComponent from '../UserComponent';
import {ActivityIndicator, Colors} from 'react-native-paper';
console.disableYellowBox = true;

let usersRef = firebase.database().ref('users');

class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      users: [],
    };
  }
  state = {
    users: [],
  };

  componentDidMount() {
    usersRef.on('value', snapshot => {
      let data = snapshot.val();

      let users = Object.values(data);
      let ids = Object.keys(data);
      for (let i = 0; i < ids.length; i++) {
        users[i].id = ids[i];
      }
      this.setState({users});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.users.length > 0 ? (
          <UserComponent
            navigation={this.props.navigation}
            users={this.state.users}
          />
        ) : (
          <View>
            <ActivityIndicator animating={true} color={Colors.blue800} />
          </View>
        )}
      </View>
    );
  }
}
export default EmpList;
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})


