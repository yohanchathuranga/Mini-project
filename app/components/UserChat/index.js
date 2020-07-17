import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../database';


export default UserChat = ({navigation}) =>{
    const uid = navigation.getParam('uid', 'uid');
    const name = navigation.getParam('name','name');
    const user = firebase.auth().currentUser;

    const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true
    },
    // example of chat message
    {
      _id:1 ,
      text: 'Hello!',
      createdAt: new Date().getTime(),
      user: {
        _id:user.uid,
        name: name,
      }
    }
  ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
    // firebase
    //   .database()
    //   .ref('/chats')
    //   .push({
    //   senderid: user.uid,
    //   uid:uid,
    //   name:this.state.name,
    //   message:messages
    //           });
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: user.uid }}
    />
  );
}
