import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
      padding: "5%"
    },
    mainLogin: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: "5%",
      paddingTop: '10%'
    },
    mainHome: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      padding: "5%",
      paddingTop: '0%',
      overflow: 'visible',
    },
    containerLoading: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#3E0B3A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  navBarText: {
    color: 'white',
    fontSize: 16,
  }
  });


export { styles };