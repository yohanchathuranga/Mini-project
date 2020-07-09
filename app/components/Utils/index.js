// import {Platform} from 'react-native';
// import firebase from '../database';
// import storage from '@react-native-firebase/storage';
// export const FireBaseStorage = storage();
//console.disableYellowBox = true;

// export const filePickerOptions = {
//   noData: true,
// };

// const getFileLocalPath = response => {
//   const {path, uri} = response;
//   return Platform.OS === 'android' ? path : uri;
// };
// const createStorageReferenceToFile = response => {
//   const {fileName} = response;
//   return FireBaseStorage.ref(fileName);
// };
// export const uploadFileToFirebase = response => {
//   const fileSource = getFileLocalPath(response);
//   const storageRef = createStorageReferenceToFile(response);
//   return storageRef.putFile(fileSource);
// };
