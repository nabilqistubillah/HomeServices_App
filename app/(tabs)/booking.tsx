import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '@/app/Utils/GlobalAPI'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from '@/app/screens/BusinessListbyCategory/BusinessListItem'

type Booking = {
  id: any;
  businessList: any; 
  status?: string;
};
const BookingScreen = () => {

  const {user}=useUser();
  const [bookingList,setBookingList]=useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(()=>{
    user&&getUserBookings();
  },[user])

  /**
   * *Get User Bookings */
  const getUserBookings=()=>{
    setLoading(true);
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      setLoading(false);
      return;
    }
    GlobalAPI.getUserBookings(email).then(resp => {
      setBookingList(resp.bookings);
      setLoading(false);
    });
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'Outfit-Medium', fontSize:26}}>My Bookings</Text>

      <View>
        <FlatList
        data={bookingList}
        onRefresh={()=>getUserBookings()}
          refreshing={loading}
        renderItem={({item,index})=>(
          <BusinessListItem 
          business={item?.businessList}
          
          booking={item}
          />
        )}
        />
      </View>
    </View>
  )
}

export default BookingScreen;