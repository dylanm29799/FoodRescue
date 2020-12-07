import React from 'react';
import { View, StyleSheet } from 'react-native';
import logo from "../components/Logo"


const Logo = props => {
    return (
        
        <View style={styles.logo}>
            <img src={"../assets/Logo.png"} alt="My logo" />
        </View>
)
    

};

const styles = StyleSheet.create({
    logo: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
         }

});

export default Logo;