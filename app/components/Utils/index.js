import React from 'react';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import firebase from '../database';
import { View,StyleSheet} from 'react-native';
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
      uid: this.props.navigation.getParam('uid','uid'),
      name: this.props.navigation.getParam('name','name'),
      _id: user.uid,
    };
  }

renderSend(props) {

    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );

  } 
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={newMessage=>this.send(newMessage)}
        user={this.user}
        placeholder='Type your message here...'
        showUserAvatar
        showAvatarForEveryMessage
        alwaysShowSend
        renderSend={this.renderSend}
        // renderSend={()=>this.renderSend()}
      />
    );
  }

  componentDidMount() {
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  refOn = callback => {
    firebase.database()
    .ref('Messages')
    .limitToLast(20)
    .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);
    if(user.id==this.user.uid){
      const message = {
        id,
        _id,
        timestamp,
        text,
        user,
      };
      return message;

    }
      
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      console.log(message)
      // firebase.database().ref('Messages').push(message);
      firebase.firestore().collection('chats').doc('1').add(message)
    }
  };

}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});