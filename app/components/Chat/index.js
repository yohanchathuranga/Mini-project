import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'; // 0.3.0

import firebase from '../database';
console.disableYellowBox = true;

export default class Chat extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: (navigation.state.params || {}).id || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      //   name: this.props.navigation.state.params.id,
      //   email: this.props.navigation.state.params.id,
      //   avatar: this.props.navigation.state.params.avatar,
      id: firebase.uid,
      _id: firebase.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebase.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    firebase.get(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }
  componentWillUnmount() {
    firebase.shared.Off();
  }
}
