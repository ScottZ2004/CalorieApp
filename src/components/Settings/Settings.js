import { View, Image, StyleSheet } from 'react-native';

export default function Settings(){
    return(
        <View style={styles.container}>
            <Image
            source={require('../../../assets/images/SettingGear.png')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        padding: 10,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});

