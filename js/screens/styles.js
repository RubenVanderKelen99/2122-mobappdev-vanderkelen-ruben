import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const ORANGE='#FFA500'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
    },
    authFormContainer: {
        paddingTop: Constants.statusBarHeight,
    },
    mapViewContainer: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height/2),
    },
    smallLogo: {
        flex: 1,
        height: 160,
        width: 160,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10,
    },
    title: {
        alignSelf: 'center',
        fontFamily:'Roboto',
        fontWeight: '500',
        fontSize: 24,
    },
    formInput: {
        alignContent: 'center',
        overflow:'hidden',
        backgroundColor:'transparent',
        marginLeft: 40,
        marginRight: 40,
    },
    formInputPromo: {
        alignContent: 'center',
        overflow:'hidden',
        backgroundColor:'transparent',
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center',
    },
    submitButton: {
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40,
        height: 50,
        borderRadius: 30,
        justifyContent:'center',
    },
    errorMsg: {
        marginLeft: 40,
        marginRight: 40,
    },
    errorText: {
        color:'red',
    },
    redirectText: {
        paddingTop: 20,
        paddingLeft: 10,
        alignItems:'center',
        fontFamily:'Roboto',
        fontSize: 18,
    },
    redirectUnderlineText: {
        textDecorationLine:'underline',
        color:ORANGE,
        alignContent:'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height/2),
        position: 'absolute',
        top: 0,
        left: 0,
    },
    zoneMap: {
        alignSelf: 'center',
    },
    roundButtonMenu: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#fff',
        borderRadius:50,
        position: 'absolute',
        top: 25,
        left: 5,
        zIndex: 1,
    },
    roundButtonLocation: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#fff',
        borderRadius:50,
        position: 'absolute',
        bottom: 5,
        right: 5,
        zIndex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    headerBackButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginRight: 20,
    },
    headerTitle: {
        alignSelf: 'center',
        fontFamily:'Roboto',
        fontWeight: 'bold',
        fontSize: 22,
    },
    drawerWrapper: {
          flex: 1,
    },
    drawerContent: {
      flex: 1,
    },
    drawerUserInfo: {
      paddingLeft: 20,
    },
    drawerUsername: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    drawerMail: {
      fontSize: 14,
      lineHeight: 14,
    },
    drawerSection: {
      marginTop: 15,
    },
    drawerBottomSection: {
        marginBottom: 15,
    },
    locationHeaderMain: {
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    locationHeaderSub: {
        alignSelf: 'flex-start',
        fontSize: 14,
        marginLeft: 20,
        marginTop: 20,
    },
    locationInput: {
        alignSelf: 'center',
        height: 40,
        width: Dimensions.get('window').width - 40,
        marginTop: 10,
    },
    locationRow: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    locationRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    locationRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    locationName: {
        fontSize: 18,
        marginLeft: 5,
    },
    locationDistance: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    locationIcon: {
    },
    moreIcon: {
    },
});

export default styles;