import React from 'react'
import { View, Text } from 'react-native'

const Message = ({message:{user,text},name}) => {
    let isSentByCurrentUser=false

    const trimmedname=name.trim().toLowerCase()

    if(user===trimmedname){
        isSentByCurrentUser=true
    }

    return (
        isSentByCurrentUser?
       ( <View style={{justifyContent:'flex-end',backgroundColor:'blue'}} >
            <Text>{trimmedname}</Text>
            <Text>{text}</Text>
        </View>)
        :(
            <View style={{justifyContent:'flex-start',backgroundColor:'grey'}} >
            <Text>{trimmedname}</Text>
            <Text>{user}</Text>
            <Text>{text}</Text>
        </View>
        )
    )
}

export default Message
