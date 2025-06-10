import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Heading from '@/app/Components/Heading'
import { Colors } from 'react-native/Libraries/NewAppScreen'

interface Business {
  about: string;
  // add other fields as needed
}

interface BusinessAboutMeProps {
  business: Business;
}

export default function BusinessAboutMe({ business }: BusinessAboutMeProps) {
  const [isReadMore, setIsReadMore] = React.useState(false);

  return business&&(
    <View>
        <Heading text={'About Me'}/>
        <Text style={{fontFamily:'Outfit-Regular', lineHeight:28,color:Colors.GRAY, fontSize:16}} numberOfLines={isReadMore?20:5}>{business.about}</Text>
        <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
        <Text style={{color:Colors.PRIMARY, fontSize:16, fontFamily:'Outfit-Regular'}}>{isReadMore?'Read Less':'Read More'}</Text>
        </TouchableOpacity>
    </View>
  )
}