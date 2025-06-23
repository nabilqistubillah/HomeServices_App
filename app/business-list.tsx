import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import GlobalAPI from '@/app/Utils/GlobalAPI';
import BusinessListItem from '@/app/screens/BusinessListbyCategory/BusinessListItem';
import Colors from '@/app/Utils/Colors';
import PageHeading from '@/app/Components/PageHeading';


export default function BusinessListByCategoryScreen() {
    const param = useRoute().params as { category: string };
    const navigation = useNavigation();
    const [businessList, setBusinessList] = useState([]);

    useEffect(()=>{
      param && getBusinessByCategory();
    },[param])

    const getBusinessByCategory=()=>{
      GlobalAPI.getBussinesListByCategory(param.category).then(resp=>{
        setBusinessList(resp.businessLists);
      })
    }
  return (
    <View style={{padding:20,paddingTop:30}}>
        <PageHeading title={param.category} />
      {businessList?.length>0? <FlatList
      data={businessList}
      style={{marginTop:15}}
      renderItem={({item})=>(
        <BusinessListItem business={item} booking={{
          id: undefined,
          status: undefined
        }}/>
      )}
      />:
      <Text style={{fontFamily:'Outfit-Medium',color:Colors.GRAY,
        fontSize:20,textAlign:'center',marginTop:'20%',}}>No Business Found</Text>}
    </View>
  )
}