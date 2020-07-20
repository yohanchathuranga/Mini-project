import React from 'react';
import { GiftedChat,Send,Bubble } from 'react-native-gifted-chat';
import firebase from '../database';
import { View,StyleSheet,ActivityIndicator} from 'react-native';
import { IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

type Props = {
  name?: string,
  uid?: string,
};

export default class Utils extends React.Component<Props> {

  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Scv Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    const user = firebase.auth().currentUser;
    return {
      // uid: user.uid,
      name: this.props.navigation.getParam('name','name'),
      _id: user.uid
      // this.props.navigation.getParam('uid','uid'),
    }
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

renderSend(props) {

    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={40} color='#6646ee' />
        </View>
      </Send>
    );

  } 

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  render() {
    
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={newMessage=>this.send(newMessage)}
        user={this.user}
        renderLoading={this.renderLoading}
        placeholder='Type your message here...'
        alwaysShowSend
        renderSend={this.renderSend}
        renderBubble={this.renderBubble}
      />
    );
  }

  componentDidMount() {
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message,{
          _id: Math.round(Math.random() * 1000000),
          text: message,
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        }),
      }))
    );
    console.log(this.state.messages)
  }

  refOn = callback => {
    firebase.database()
    .ref('/Messages/')
    .limitToLast(20)
    .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  parse = snapshot => {
    const { createdAt, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(createdAt);
      const message = {
        id,
        _id,
        timestamp,
        text,
        user,
      };
      return message;
  };

  // get timestamp() {
  //   return firebase.database.ServerValue.TIMESTAMP;
  // }

  send = messages => {
    
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: new Date().getTime(),
      };
      console.log(message)
      firebase.database().ref('Messages').push(message);
      // firebase.firestore().collection('chats').doc('1').add(message)
    }
  };

}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});