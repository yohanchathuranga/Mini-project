import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Picker,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {List, IconButton, Colors, Searchbar, Appbar} from 'react-native-paper';
import call from 'react-native-phone-call';
import SendSMS from 'react-native-sms';
console.disableYellowBox = true;
const extractKey = ({name}) => name;

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      datasource: this.props.users,
      chooseValue: '',
    };
    this.arrayholder = [];
  }
  state = {
    search: '',
    chooseValue: '',
  };

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  static propTypes = {
    users: PropTypes.array.isRequired,
  };

  onChangeSearch(text) {
    this.arrayholder = this.props.users;
    const newData = this.arrayholder.filter(function(user) {
      const itemData = user.name ? user.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      datasource: newData,
      search: text,
    });
  }

  someFunction(no) {
    SendSMS.send(
      {
        body: '',

        recipients: [no],

        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }

  call = no => {
    const args = {
      number: no,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  menu() {
    this.setState({isPressed: true});
  }
  update(value) {
    this.setState({chooseValue: value});
    return this.state.chooseValue;
  }

  render() {
    return (
      <View style={styles.usersList}>
        <Searchbar
          searchIcon={{size: 24}}
          placeholder="Search"
          onChangeText={text => this.onChangeSearch(text)}
          onClear={text => this.onChangeSearch('')}
          value={this.state.search}
        />

        <Picker
          style={styles.pickerStyle}
          itemStyle={styles.item}
          selectedValue={this.state.chooseValue}
          onValueChange={itemValue => this.update(itemValue)}>
          <Picker.Item style={styles.item} label="All" value="" />
          <Picker.Item label="Manager" value="Manager" />
          <Picker.Item label="Doctor" value="Doctor" />
          <Picker.Item label="CEO" value="Ceo" />
          <Picker.Item label="Secretery" value="Secretary" />
        </Picker>

        <FlatList
          style={styles.container}
          data={this.state.datasource}
          renderItem={({item}) => (
            <ScrollView>
              {item.status == this.state.chooseValue ||
              this.state.chooseValue == '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.name}</Text>
                  <IconButton
                    icon="account-details"
                    color={Colors.blue500}
                    size={20}
                    onPress={() =>
                      this.props.navigation.navigate('UserDetails', {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        age: item.age,
                        contact_no: item.contact_no,
                        department: item.department,
                        status: item.status,
                      })
                    }
                  />
                  <IconButton
                    icon="phone"
                    color={Colors.blue600}
                    size={20}
                    onPress={() => this.call(item.contact_no)}
                  />
                  <IconButton
                    icon="message"
                    color={Colors.blue500}
                    size={20}
                    onPress={() => this.someFunction(item.contact_no)}
                  />
                </View>
              ) : null}
            </ScrollView>
          )}
          keyExtractor={extractKey}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  usersList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  usertext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  top1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  container: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "center",
    // padding: 2,
    backgroundColor: '#fff',
  },
  pickerStyle: {
    backgroundColor: '#f7f5f5',
    borderColor: '#c4c4c4',
    borderWidth: 2,
  },
  item: {
    color: '#f20000',
    lineHeight: 100,
  },
});
