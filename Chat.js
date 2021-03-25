import React, {useState,useEffect} from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import io from 'socket.io-client'
import TeacherView from './TeacherView';
import Messages from './Messages'


let socket;

const ENDPOINT ='http://localhost:3000'




const Chat = ({navigation,route}) => {

const{name,room} = route.params;

const[Name,setName]=useState('')
const[Room,setRoom]=useState('')
 const[messages,setMessages] = useState([]);
 const[message,setMessage] = useState('');


    useEffect(()=>{
        socket = io(ENDPOINT)


        // setName(name)
        // setRoom(room)

        socket.emit('join',{name,room}, ()=>{

        } )

        // console.log(socket)

        return()=>{
            socket.emit('disconect');
            socket.off();
        }

    },[ENDPOINT,name,room])



    useEffect(()=>{

        socket.on('message',(message)=>{
            setMessages([...messages,message])
        })

        console.log(message,messages);

    },[messages])

    const sendMessage=()=>{
        if(message){
            socket.emit('sendMessage',message, ()=>setMessage(''))
        }
    }

    


    return (
        <View style={styles.container} >
            <Text>chat</Text>
            {/* <TeacherView/> */}
            {/* <ScrollView>
            {messages.map((item,index)=>{
                <View key={index} style={{backgroundColor:'pink',width:200,height:30}} >
                    <Text>
                        {item.text}
                    </Text>
                </View>
            })}
            </ScrollView> */}
            <Messages name={name} messages={messages} />
            <Text>{room}</Text>

        <TextInput style={{borderColor:'black',borderWidth:1,width:300,height:35}} value={message} onChangeText={(txt)=>setMessage(txt)} />
        <Button title="Enter" onPress={sendMessage} />

        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
