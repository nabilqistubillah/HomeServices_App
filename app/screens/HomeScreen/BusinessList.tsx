import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import GlobalAPI from '@/app/Utils/GlobalAPI'
import { useEffect } from 'react'
import BusinessListItemSmall from './BusinessListItemSmall'

// Define the business type
interface business {
  id: number;
  name: string;
  description: string;
  image: { url: string }[];
  contactPerson: string; // Add missing property
  category: { name: string }; // Update property type to match expected structure
}

export default function BusinessListIte() {

    const [businessList, setBusinessList] = useState<business[]>([]);
    useEffect(()=>{
        getBusinessList();
    },[])

{/* businessList dari API */}    
    const getBusinessList = () => {
        GlobalAPI.getBusinessList().then(resp=>{   
            console.log(resp);
            setBusinessList(resp.businessList)
        })
    }
  return (
    <View style={{marginTop:20}}>
      <Heading text={'Latest Business'} isViewAll={true}/>

      <FlatList
      data={businessList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index}) =>(
        <View style={{marginRight:10}}>

            <BusinessListItemSmall business={item}/>
        </View>
    )}
    />
    </View>
  )
}