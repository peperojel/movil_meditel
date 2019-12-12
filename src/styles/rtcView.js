import { StyleSheet } from "react-native";

const rtcView = StyleSheet.create({
  userVideo1:{
    // backgroundColor: 'black',
    // position:"absolute",
    // borderRadius:80,
    // left: "55%",
    // top: "65%",
    // width: "40%",
    // height: "28%",
    // overflow:'hidden',
    // zIndex:2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 10,
  },
  testStyle:{
    width: "30%",
    height: "30%",
    zIndex: 2,
    alignSelf: 'flex-end',
    margin: 15,
    overflow: 'hidden',
    // borderRadius: 100,
    // borderWidth: 0,
    // backgroundColor: '#424242'
    // backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  fullScreen: {
    position: 'absolute',
    backgroundColor: 'black',
    borderColor: 'black',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // zIndex: 2,
    // marginTop: 0,
    width: "100%",
    height: "100%",
    // left: 200,
    // borderWidth: 2,
    // alignSelf: 'baseline'
  },    
  remoteVideo:{
    backgroundColor: 'black',
    borderColor: 'black',
    flex:1,
    borderWidth: 5,
    borderRadius: 20,
  }
});

export default rtcView;