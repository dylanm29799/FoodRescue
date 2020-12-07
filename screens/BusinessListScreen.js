import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BusinessListScreen = props => {
    return (
        
        <View style={styles.screen}>
            <Text>The Business List Screen</Text>
            <Button title="Go to Item Details!" onPress={() => {
                props.navigation.navigate({routeName: 'ItemDetail' })
            }}/>
        </View>
)
    

};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
         }

});

export default BusinessListScreen;