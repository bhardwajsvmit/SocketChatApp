import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'


const Join = ({navigation}) => {

    const[name,setName]=useState('')
    const[room,setRoom]=useState('')

    const ree = ()=>{
        setName('')
        setRoom('')
    }

    

    return (
        <View style={{justifyContent:'space-evenly',alignItems:'center',flex:1,flexDirection:'column'}} >
            <Text style={{padding:50,fontSize:40}} >Join Chat</Text>
        <View style={{justifyContent:'center',alignItems:'center',flex:1}} >
            <TextInput style={styles.txtinp} value={name} placeholder='Name' onChangeText={(text)=>setName(text)} />
            <TextInput style={styles.txtinp} value={room} placeholder='Room' onChangeText={(text)=>setRoom(text)} />
            <Button title="Enter" onPress={()=>(name&&room)?navigation.navigate('Chat',{name:name,room:room}):null} />
        </View>
        </View>
    )
}

export default Join

const styles = StyleSheet.create({
    txtinp:{
        width:300,
        height:25,
        borderWidth:1,
        borderColor:'black',
        padding:5,
        margin:2
    }
})

