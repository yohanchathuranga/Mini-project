import React, {Component} from 'react';
import {ScrollView, Text, View, Alert, StyleSheet} from 'react-native';
import {
  List,
  ActivityIndicator,
  Colors,
  Portal,
  Provider,
  FAB,
} from 'react-native-paper';
import firebase from '../database';
console.disableYellowBox = true;
let notificationsRef = firebase.database().ref('notifications');

class Notifications extends Component {
  state = {
    notifications: [],
    open: false,
  };

  componentDidMount() {
    notificationsRef.orderByChild('title').on('value', snapshot => {
      snapshot.forEach(function() {});
      let data = snapshot.val();
      let notifications = Object.values(data);
      this.setState({notifications});
    });
  }
  render() {
    const onStateChange = ({open}) => this.setState({open});

    const {open} = this.state;
    const arr = this.state.notifications.sort(function(a, b) {
      return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
    });
    return (
      <View style={styles.container}>
        {this.state.notifications.length > 0 ? (
          <View>
            <Text>Tap on Messege to see more...</Text>
            {arr.map((notification, index) => (
              <ScrollView key={index}>
                <List.Item
                  title={notification.title}
                  description={notification.description}
                  right={() => <Text>{notification.date}</Text>}
                  onPress={() =>
                    Alert.alert('Success', notification.description, [
                      {
                        text: 'ok',
                        onPress: () =>
                          this.props.navigation.navigate('Notifications'),
                      },
                    ])
                  }
                />
              </ScrollView>
            ))}
          </View>
        ) : (
          <View style={styles.indicator}>
            <ActivityIndicator animating={true} color={Colors.blue800} />
          </View>
        )}
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'menu' : 'menu'}
              actions={[
                {
                  icon: 'plus',
                  onPress: () => this.props.navigation.navigate('AddNotifications'),
                },
                {
                  icon: 'briefcase',
                  label: 'Employees',
                  onPress: () => this.props.navigation.navigate('EmpList'),
                },
                {
                  icon: 'email',
                  label: 'Email',
                  onPress: () =>
                    this.props.navigation.navigate('Notifications'),
                },
                {
                  icon: 'bell',
                  label: 'Notifications',
                  onPress: () =>
                    this.props.navigation.navigate('Notifications'),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
      </View>
    );
  }
}
export default Notifications;
const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
  },
});
