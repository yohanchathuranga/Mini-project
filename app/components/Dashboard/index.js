import React, {Component} from 'react';
import {View, StyleSheet,Button,BackHandler,Alert, Image,Dimensions,ScrollView} from 'react-native';
import {Appbar,IconButton,Colors} from 'react-native-paper';
import Home from '../Home';
import Notifications from '../Notifications'
import firebase from '../database'
console.disableYellowBox = true;

const width = Dimensions.get('window').width;
class Dashboard extends Component {
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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    if (this.props.navigation.state.routeName == 'Dashboard' || this.props.navigation.state.routeName == 'Login') {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
        );
    return true;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Appbar style={styles.top}>
          <Appbar.Action
            icon="archive"
            onPress={() => this.props.navigation.navigate('EmpList')}
          />
          <Appbar.Action
            icon="bell"
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          <Appbar.Action
            icon="chat"
            onPress={() => this.props.navigation.navigate('Chat')}
          />
          <Appbar.Action
            icon="plus"
            onPress={() => this.props.navigation.navigate('Add')}
          />
        </Appbar>
        <View>
          <Image source={require('../../Asserts/cap.png')} style={styles.image}/>
          <ScrollView>
            <Notifications/>
          </ScrollView>
          
          {/* <List.Item
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
            title="Test"
            onPress={() => this.props.navigation.navigate('Test')}
          />
          <List.Item
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <List.Item
            title="Register"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
          <List.Item
            title="Chat box"
            onPress={() => this.props.navigation.navigate('Utils')}
          /> */}
        </View>
        <Button
        title="Sign out"
        onPress={() => this.signOut()} 
        />
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
  image:{
    width:width,
    height:300,
    backgroundColor: 'orange'
  }
});
