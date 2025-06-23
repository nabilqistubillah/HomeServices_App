import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Heading from '../../Components/Heading';
import Colors from '@/app/Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  'business-list': { category: string };
  
};

export default function Categories() {

 
    type Category = {
        icon: { url: string };
        name: string;
    };

    const [categories, setCategories] = useState<Category[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    useEffect(()=>{
        getCategories();
    },[])
    /**mendapatkan kategori */
    const getCategories = () => {
        GlobalAPI.getCateggories().then(resp => {
          const allowed = ['Cleaning', 'Repair', 'Painting', 'Shifting'];
          const filtered = resp?.categories.filter((cat: Category) =>
            allowed.includes(cat.name)
          );
          setCategories(filtered);
        });
    } 
  return (
    <View style={{marginTop:10}}>
      <Heading text={'Categories'} isViewAll={true}/>
      <FlatList
      data={categories}
      numColumns={4}
      renderItem={({item,index})=>index<=3 ? (
        <TouchableOpacity style={styles.container}
        onPress={()=>navigation.push('business-list', {
          category: item.name
        })}>
            <View style={styles.iconContainer}>
                <Image source={{uri:item?.icon?.url}} 
                style={{width:30,height:30}}
                />
            </View>
            <Text style={{fontFamily:'Outfit-Medium, marginTop:5'}}>{item?.name}</Text>
        </TouchableOpacity>
      ) : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',

    },
    iconContainer:{
        backgroundColor:Colors.LIGHT_GRAY,
        padding:17,
        borderRadius:99,

    }
    })