import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/app/Utils/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import BusinessAboutMe from './BusinessAboutMe';
import BusinessPhotos from './BusinessPhotos';

type BusinessDetailsScreenRouteParams = {
  business: any; // Replace 'any' with your actual business type if available
};

export default function BusinessDetailsScreen() {
  const { params } = useRoute<RouteProp<{ params: BusinessDetailsScreenRouteParams }, 'params'>>();
  const [business,setBusiness]=useState(params.business);
  const [isReadMore, setIsReadMore] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    
  }, [])
  return business&&(
  <View>
    <ScrollView style={{height:'93%'}}>
      <TouchableOpacity style={styles.backBtnContainer}
        onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="white"/>
      </TouchableOpacity>
      <Image source={{uri:params?.business?.image[0]?.url}}
        style={{width: '100%', height:300}}
      />

      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'Outfit-Bold'}}>{business?.name}</Text>
        <View style={styles.subContainer}>
        <Text style={{fontFamily:'Outfit-Medium', color:Colors.PRIMARY, fontSize:20}}>{business?.contactPerson}✨</Text>
        <Text style={{color:Colors.PRIMARY, backgroundColor:Colors.PRIMARY_LIGHT, padding:5, borderRadius:5, fontSize:14}}>{business?.category.name}</Text>
        </View>
        <Text style={{fontSize:17, fontFamily:'Outfit-Regular', color:Colors.GRAY}}>
          <Entypo name="location" size={20} color={Colors.PRIMARY} />{business?.address}</Text>

          {/*HorizontalLine*/}
          <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>
          {/*bagian: about me */}
          <BusinessAboutMe business={business}/>

          {/*HorizontalLine*/}
          <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>

          <BusinessPhotos business={business}/>
      </View>
    </ScrollView>
    <View style={{display:'flex', flexDirection:'row', margin:8, gap:8}}>
      <TouchableOpacity style={styles.massagebtn}>
        <Text style={{textAlign:'center', fontFamily:'Outfit-Medium', color:Colors.PRIMARY, fontSize:18}}>Massage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookingbtn}>
        <Text style={{textAlign:'center', fontFamily:'Outfit-Medium', color:Colors.WHITE, fontSize:18}}>Book Now</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  backBtnContainer:{
    position: 'absolute',
    zIndex:10,
    padding:20,
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap:7,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap:5,
    alignItems: 'center',
  },
  massagebtn:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1,
  },
  bookingbtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1,
  },

})