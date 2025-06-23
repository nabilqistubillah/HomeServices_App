import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '@clerk/clerk-expo';
import Colors from '@/app/Utils/Colors';

export default function ProfileScreen() {
  const {user}=useUser();
  const profileMenu=[
    {
      id:1,
      name:'Home',
      icon:'home'
    },
    {
      id:2,
      name:'My Booking',
      icon:'bookmark-sharp'
    },
    {
      id:3,
      name:'Contact Us',
      icon:'mail'
    },
    {
      id:3,
      name:'Logout',
      icon:'Log-out'
    }
  ]
  return (
    <View>
    <View style={{padding:20,paddingTop:30, backgroundColor:Colors.PRIMARY,}}>
      <Text style={{fontSize:24,fontFamily:'Outfit-Bold'}}>Profile</Text>
      <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        

      }}>
        {user && <Image source={{uri: user.imageUrl}} 
        style={{width:99,height:99,borderRadius:99}}/>}
        <Text style={{fontSize:23,marginTop:8,fontFamily:'Outfit-Medium',
          color:Colors.WHITE,
        }}>{user?.fullName}</Text>
        <Text style={{fontSize:12,marginTop:8,fontFamily:'Outfit-Medium',
          color:Colors.WHITE,
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
    </View>

    <View style={{paddingTop:60 }}>
      <FlatList
      data={profileMenu}
      renderItem={({item,index}) =>(
        <TouchableOpacity style={{display:'flex',flexDirection:'row',
        alignItems:'center', gap:10, marginBottom:38, paddingHorizontal:80}}>
          <Ionicons name={item.icon as any} size={30} color={Colors.PRIMARY}/>
          <Text style={{fontFamily:'Outfit-Regular',
            fontSize:20,}}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
    </View>
  )
}