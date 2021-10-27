import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const ORANGE='#FFA500'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
        maxWidth: 500,
    },
    authFormContainer: {
        paddingTop: Constants.statusBarHeight,
    },
    smallLogo: {
        flex: 1,
        height: 140,
        width: 140,
        alignSelf: "center",
        margin: 30,
    },
    formInput: {
        alignContent: 'center',
        overflow:'hidden',
        backgroundColor:'transparent',
        marginLeft: 40,
        marginRight: 40,
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
    roundButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#fff',
        borderRadius:50,
    }
});

export default styles;