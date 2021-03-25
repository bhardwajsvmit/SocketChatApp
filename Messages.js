import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Message from './Message';

const Messages = ({messages,name}) => {
    return (
        <View style={{height:600,width:400}} >
          <ScrollView>
              {messages.map((message,i)=>
              <Message key={i} message={message} name={name} />
              )}
          </ScrollView>
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({})
