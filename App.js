import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Join from './Join';
import MainStack from './MainStack';
import TeacherView from './TeacherView';


import React, {useEffect,useState,useMemo,useContext, useReducer} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


import Login from './Login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context';








export default function App() {


  const initaialLoginState={
    isLoading:true,
    userName:null,
    userToken:null,
  };
  
  const loginReducer =(prevState,action)=>{
    switch(action.type){
      case 'RETRIVE_TOKEN':
        return {...prevState,
        isLoading:false,
        userToken:action.token,
      };
      case 'SIGNIN':
        return {...prevState,
          userToken:action.token,
          userName:action.username,
          isLoading:false};
        case 'LOGOUT':
        return {...prevState,
          userToken:null,
          userName:null,
          isLoading:false};
    }
  };
  
  
  const [loginState,dispatch]=useReducer(loginReducer,initaialLoginState)
  
  
  const authContext=useMemo(()=>({
  
    signin: async(username,password)=>{
  
      
      const response = await fetch(
        'https://zinedu-main.herokuapp.com/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
            returnSecureToken: true
          })
        });
        
  
        if (!response.ok) {
          const errorResData = await response.json();
          const errorId = errorResData.error.message;
          let message = 'Something went wrong!';
          if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
          } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
          }
          throw new Error(errorId);
        }
        
        const resData = await response.json();
         console.log(resData);
         console.log(resData.token)
        const token = await resData.token;
          if (token!==undefined)
        try {
          await AsyncStorage.setItem('userToken', resData.token)
          await AsyncStorage.setItem('userName', username)
        } catch (e) {
          // saving error
          console.log(e)
        }
  
        // setUserToken(resData.token)
        // setIsLoading(false)
          dispatch({type:'SIGNIN',username:username,token:token})
  },
  
  logout:async()=>{
  
    try {
      await AsyncStorage.removeItem('userToken')
    } catch (e) {
      // saving error
      console.log(e)
    }
  
    dispatch({type:'LOGOUT'})
  // setUserToken(null)
  // setIsLoading(false)
  }
  
  }),[]);
  
  
  useEffect(() => {
    setTimeout(async()=>{
  
      let userToken = null
      let userName = null
      try {
       
       userToken = await AsyncStorage.getItem('userToken')
       userName = await AsyncStorage.getItem('userName')
      } catch (e) {
        // saving error
        console.log(e)
      }
      dispatch({type:'RETRIVE_TOKEN',username:userName,token:userToken})
      // setIsLoading(false)
    },1000);
  }, []);
  
  
  
  if(loginState.isLoading){
    // if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
        <ActivityIndicator size="large" />
      </View>
    )
  }




  return(

    <AuthContext.Provider value={authContext} >
    <NavigationContainer>
      {(loginState.userToken!==null) ?(
        
       
        // <TeacherView/>

        <MainStack/>
      
        
      ):

       <Login/> 

      }
    </NavigationContainer>
    </AuthContext.Provider>

    


   
  )

}




