import React, { useState, useCallback, useEffect, Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, StyleSheet,FlatList ,Text} from 'react-native';
import firebase from '../database';
import UserComponent from '../UserComponent';
import { ActivityIndicator, Colors } from 'react-native-paper';
console.disableYellowBox = true;
let usersRef = firebase.database().ref('users');

class ChatList extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            users: [],
        };
        const user = firebase.auth().currentUser;

        console.log(user.uid)

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
            this.setState({ users });
        });
    }

    // Chat=(reciever)=> {
    //     const [messages, setMessages] = useState([]);
    
    //     useEffect(() => {
    //         setMessages([{
    //             _id: this.user.uid,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: reciever.uid,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         }, ]);
    //     }, []);
    
    //     const onSend = useCallback((messages = []) => {
    //         setMessages(previousMessages =>
    //             GiftedChat.append(previousMessages, messages),
    //         );
    //     }, []);
    
    //     return ( 
    //         <GiftedChat messages = { messages }
    //         onSend = { messages => onSend(messages) }
    //         user = {
    //             {
    //                 _id: user.uid,
    //             }
    //         }
    //         />
    //     );
    // };

    render() {
        return ( 
            <View style = { styles.container } > 
            {this.state.users.length > 0 ? ( 
                    <FlatList
                    style={styles.container}
                    data={this.state.users.sort((a, b) => a.name.localeCompare(b.name))}
                    renderItem={({item}) =>
                    (
                    <Text style={styles.item}
                    onPress={() =>this.props.navigation.navigate('UserChat',{uid:item.uid,name:item.name})}>{item.name}</Text>
                    )}
                    />
                    

                ) : ( 
                    <View>
                    <ActivityIndicator animating = { true }
                    color = { Colors.blue800 }
                    />
                    </View>
                )
            }
            </View>
        );
    }
}
export default ChatList;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      backgroundColor: 'white',
    },
    item:{
        lineHeight:50,
        borderBottomWidth:1,
        borderBottomColor:'#bec7d4',
        paddingLeft:20
    }
  });
  