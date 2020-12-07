import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SortScreen = props => {
    return (
        <FlatList numColumns={2}/>
)
    

};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
         }

});

export default SortScreen;