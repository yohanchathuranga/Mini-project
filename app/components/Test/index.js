import React, {Platform, Component} from 'react';
import firebase from '../database';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
console.disableYellowBox = true;

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const androidPermissions = AndroidPermissions;
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleFile: '',
    };
  }
  async selectOneFile() {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Setting the state to show single file attributes
      this.setState({singleFile: res});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  upload(url) {
    let ref = firebase.storage().ref();
    let reference = ref.child('application/' + this.state.singleFile.name);
    let mime = 'application/pdf';
    let uploadBlob = null;
    fs.readFile(url, 'base64')
      .then(data => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then(blob => {
        uploadBlob = blob;
        return reference.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return reference.getDownloadURL();
      });
    console.log(reference.getDownloadURL());
    //   .then(url => {
    //     resolve(url);
    //   })
    //   .catch(error => {
    //     reject(error);
    //   });
    // var bl = Blob.build(url);
    // try {
    //   console.log(url);
    //   reference.put(bl).then(function(snapshot) {});
    // } catch (err) {
    //   console.log(JSON.stringify(err));
    // }
  }
  
  download() {
    let ref = firebase.storage().ref();
    ref
      .child('application/1.pdf')
      .getDownloadURL()
      .then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        var img = document.getElementById('myimg');
        img.src = url;
        console.log(img.src);
      })
      .catch(function(error) {
        // Handle any errors
      });
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={this.selectOneFile.bind(this)}>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>

        {/*Showing the data of selected Single file*/}
        <Text style={styles.textStyle}>
          File Name:{' '}
          {this.state.singleFile.name ? this.state.singleFile.name : ''}
          {'\n'}
          Type: {this.state.singleFile.type ? this.state.singleFile.type : ''}
          {'\n'}
          File Size:{' '}
          {this.state.singleFile.size ? this.state.singleFile.size : ''}
          {'\n'}
          URI: {this.state.singleFile.uri ? this.state.singleFile.uri : ''}
          {'\n'}
        </Text>
        <View style={{backgroundColor: 'grey', height: 2, margin: 10}} />
        {/*To multiple single file attribute*/}
        <Button
          title="press"
          onPress={() => this.upload(this.state.singleFile.uri)}
        />
        <Button title="press" onPress={() => this.download()} />
      </View>
    );
  }
}
export default Test;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});
