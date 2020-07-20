import React, {Component} from 'react';
import {ScrollView, Text, View, Alert, StyleSheet} from 'react-native';
import {
  List,
  ActivityIndicator,
  Colors,
  Portal,
  Provider,
  FAB,
  Divider
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
                <List.Item style={styles.item}
                  title={notification.title}
                  description={notification.description}
                  right={() => <Text>{notification.date}</Text>}
                  onPress={() =>
                    Alert.alert(notification.title, notification.description, [
                      {
                        text: 'Cancel',
                        onPress: () =>
                          this.props.navigation.navigate('Notifications'),
                      },
                    ])
                  }
                />
                <Divider/>
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
            <FAB.Group style={styles.fab}
              open={open}
              icon={open ? 'menu' : 'menu'}
              actions={[
                {
                  icon: 'plus',
                  onPress: () =>
                    this.props.navigation.navigate('AddNotifications'),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {

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
  fab: {
    justifyContent: 'center',
  },
  item:{
    borderTopColor:'blue',
    borderTopWidth:5,
  }
});
