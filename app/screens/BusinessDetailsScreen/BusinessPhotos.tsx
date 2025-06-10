import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Heading from '@/app/Components/Heading';

interface BusinessPhotosProps {
  business: any; // Replace 'any' with a more specific type if available
}

export default function BusinessPhotos({ business }: BusinessPhotosProps) {
  return (
    <View>
      <Heading text={'Photos'}/>
      <FlatList
        data={business.images}
        numColumns={2}
        renderItem={({item})=>(
            <Image source={{uri:item.url}}
                style={{width:'100%', flex:1, borderRadius:15, margin:7, height:120 }}
            />
        )}
      />
    </View>
  )
}