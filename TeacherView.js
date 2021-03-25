import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect } from 'react/cjs/react.development'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeacherView = () => {

    const[quesId,setQuesId]=useState('')
    const[question,setQuestion]=useState([])


    function submitChatMessage() {
        socket.emit('chat message', {question});
        setMessage('');
      }


    async function getQuestion(id){
        
        const token = await AsyncStorage.getItem('userToken')
        
        var requestOptions = {
          redirect: 'follow',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token '+ token
          },
        };
        const response =await fetch('https://zinedu-main.herokuapp.com/student/get-objective-exam-question-per-id/?id='+id,requestOptions)
        const D = await response.json();
        setQuestion(D)
        console.log(D)
        setQuesId('')
    }

    


    return (
        <View style={{justifyContent:'center',alignItems:'center',height:600,width:400}} >
            <Text>teacher View</Text>
            <TextInput value={quesId} style={{width:300,height:30,borderWidth:1,borderColor:'black'}} onChangeText={(text)=>setQuesId(text)} />
            <Button title="get ques" onPress={()=>getQuestion(quesId)} />
            <Button title="show ques" onPress={()=>submitChatMessage} />
        </View>
    )
}

export default TeacherView

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });