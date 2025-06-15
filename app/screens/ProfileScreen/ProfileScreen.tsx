import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import type { IconProps } from '@expo/vector-icons/build/createIconSet';
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

    <View style={{paddingTop:100 }}>
      <FlatList
      data={profileMenu}
      renderItem={({item,index}) =>(
        <View style={{display:'flex',flexDirection:'row',
        alignItems:'center', gap:10, marginBottom:20, paddingHorizontal:50}}>
          <Ionicons name={item.icon as any} size={24} color={Colors.PRIMARY}/>
          <Text style={{fontFamily:'Outfit-Regular',
            fontSize:20,}}>{item.name}</Text>
        </View>
      )}
      />
    </View>
    </View>
  )
}