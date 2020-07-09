import {StyleSheet} from 'react-native'
import { color } from 'react-native-reanimated'
export default StyleSheet.create({
    heading : {
        fontSize : 30,
        textAlign:'center'
    },
    input:{
        marginLeft :20,
        marginRight:20,
        color:'black',
        borderBottomColor:'black',
        borderStyle:'solid',
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1

    },
    label:{
        marginLeft :20,
        marginRight:20,
        marginTop:20,
        marginBottom:20,
        fontSize:20
    
    },
    parent:{
        flex :1,
        justifyContent:'center', 
        display: "flex",
        flexDirection: "column",
        padding: 35,
        backgroundColor: '#fff'
    },
    button :{
        

    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }

})