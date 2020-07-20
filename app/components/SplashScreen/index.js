import React from 'react';
import { View, Text,Image } from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
          <Image source = {require('../../Asserts/cap.png')} style={styles.image}/>
        <Text style={styles.textStyles}>
          Hrm
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }, 
  image:{
    height:200,
    width:300,
  }
}

export default SplashScreen;
