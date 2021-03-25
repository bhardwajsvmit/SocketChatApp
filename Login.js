import React, {useEffect,useState,useContext} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import {AuthContext} from './context'



const {width,height}= Dimensions.get('window');




export default function Login({navigation}) {

    const { signin } = useContext(AuthContext);


    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
  

    

// const { LOGIN } = React.useContext(AuthContext);


    // async function loginReq(){
    //     const response= await fetch(`https://zinedu-main.herokuapp.com/login/`,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             username:username,
    //             password:password,
    //             returnSecureToken:true
    //         })
    //     });
    //     try{
    //     const reqData = await response.json();
    //     await setToken(reqData.token)
    //     console.log(token);
    //     } catch(e){
            
    //     } 
    // }




   



    return (
        <View style={styles.container} >
           
           <View style={{position:'absolute',top:(height*0.1),left:(width*0.1)}} >
           <Text style={{fontSize:30,color:'#2C3687',fontWeight:'bold',padding:2}} >Login</Text>
               <Text style={{fontSize:17,color:'#6A7180',padding:2}}>Login to continue</Text>
           </View>

        <View>
            <TextInput placeholder="Username" placeholderTextColor="#6A7180" style={styles.textinp} 
             onChangeText={text=>setUsername(text) } 
             value={username}
             autoCapitalize='none'
             />
            <TextInput placeholder="Password" placeholderTextColor="#6A7180" style={styles.textinp}
            onChangeText={text=>setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize='none'
            />
            <View style={{justifyContent:'flex-end',flexDirection:'row',paddingVertical:7}} >
               
                <TouchableOpacity onPress={() => triggerNotif} ><Text style={{color:'#2C3687',fontSize:16}} > Forgot Password?</Text></TouchableOpacity>
            </View>
        </View>

        <View style={{paddingTop:40}} >
        
        <TouchableOpacity onPress={()=>signin(username,password)} style={{width:(width*0.8),height:48,justifyContent:'center',borderRadius:8,backgroundColor:'#EA7A26'}} >
            <Text style={{color:'white',textAlign:'center',fontSize:18,fontWeight:'600'}} >Login</Text>
        </TouchableOpacity>
       
     
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'baseline',padding:20}} >
                <Text style={{fontSize:16}} >New User?</Text>
                
                <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}} ><Text style={{color:'#2C3687',fontSize:16}} > Register Now</Text></TouchableOpacity>
            </View>
        </View>
       
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width,
      height
    },
    textinp:{
        width:(width*0.85),
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'#DADFEB',
        textAlign:'left',
        marginTop:30,
        
        
    },
    smallbutton:{
        
    }
  });