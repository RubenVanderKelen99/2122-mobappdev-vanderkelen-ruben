import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const PURPLE='#6200EE'

const styles = StyleSheet.create({
    authFormContainer: {
        flex: 1,
        flexDirection:'column',
        alignContent:'center',
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
        alignItems:'center',
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
    },
    redirectUnderlineText: {
        textDecorationLine:'underline',
        color:PURPLE,
        alignContent: 'center',
    }
});

export default styles;