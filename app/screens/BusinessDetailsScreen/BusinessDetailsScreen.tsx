import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/app/Utils/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Heading from '@/app/Components/Heading';

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
          <Entypo name="location" size={25} color={Colors.PRIMARY} />{business?.address}</Text>

          {/*HorizontalLine*/}
          <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>
          {/*bagian: about me */}
          <View>
            <Heading text={'About Me'}/>
            <Text style={{fontFamily:'Outfit-Regular', lineHeight:28,color:Colors.GRAY, fontSize:16}} numberOfLines={isReadMore?20:5}>{business.about}</Text>
            <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
            <Text style={{color:Colors.PRIMARY, fontSize:16, fontFamily:'Outfit-Regular'}}>{isReadMore?'Read Less':'Read More'}</Text>
            </TouchableOpacity>
          </View>

          {/*HorizontalLine*/}
          <View style={{borderWidth:0.4, borderColor:Colors.GRAY, marginTop:20, marginBottom:20}}></View>
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

})