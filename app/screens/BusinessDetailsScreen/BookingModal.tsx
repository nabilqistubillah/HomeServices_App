import { View, Text, TouchableOpacity, StyleSheet, FlatList, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '@/app/Components/PageHeading';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '@/app/Utils/Colors';
import Heading from '@/app/Components/Heading';
import { TextInput } from 'react-native-gesture-handler';
import GlobalAPI from '@/app/Utils/GlobalAPI';
import { useUser } from '@clerk/clerk-react';

type BookingModalProps = {
  hideModal: () => void;
};
export default function BookingModal(this: any, { hideModal }: BookingModalProps) {

  const [timeList, setTimeList] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedNote, setSelectedNote] = useState<string>('');
  const {user}=useUser();
  useEffect(()=>{
    getTime();
  },[])
  const getTime=()=>{
    const timeList=[];
    for(let i=8;i<=12;i++)
    {
      timeList.push({
        time:i+':00 AM'
      })
      timeList.push({
        time:i+':30 AM'
      })
    }
     for(let i=1;i<=7;i++)
    {
      timeList.push({
        time:i+':00 PM'
      })
      timeList.push({
        time:i+':30 PM'
      })
    }
    setTimeList(timeList);
  }
  function setNote(text: NativeSyntheticEvent<TextInputChangeEventData>): void {
    throw new Error('Function not implemented.');
  }


  // Create Booking Method
  const createNewBooking = () => {
    const data = {
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      date: selectedDate,
      time: selectedTime,
      note: selectedNote,
      userId: user?.id,
    };
    GlobalAPI.createBooking(data).then(resp => {
      console.log("Resp", resp)
    })
  }
  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center', marginBottom:20}}
          onPress={()=> hideModal()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="black"/>
            <Text style={{fontSize:25,fontFamily:'Outfit-Medium'}}>Booking</Text>
        </TouchableOpacity>

        {/*bagian kalender */}
          <Heading text={'Select Date'}/>
          <View style={styles.calenderContainer}>
            <CalendarPicker 
              onDateChange={setSelectedDate}
              width={300}
              minDate={Date.now()}
              todayBackgroundColor={Colors.BLACK}
              todayTextStyle={{color:Colors.WHITE}}
              selectedDayColor={Colors.PRIMARY}
              selectedDayTextColor={Colors.WHITE}
              />
          </View>

        {/*Bagian pemilihan waktu*/}
          <View style={{marginTop:20}}>
            <Heading text={'Select Time Slot'}/>
            <FlatList
              data={timeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item,index }) => (
                <TouchableOpacity style={{marginRight:10}}
                onPress={()=>setSelectedTime(item.time)}>
                  <Text style={[selectedTime==item.time?
                    styles.selectedTime:styles.unSelectedTime]}> 
                    {item.time}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        {/*Bagian catatan*/}
          <View style={{paddingTop:20}}>
            <Heading text={'Any Suggestion Note?'}/>
            <TextInput placeholder='Note' 
            numberOfLines={4} multiline={true} 
            style={styles.noteTextArea}
            onChange={(text)=>setNote(text)}
            />
          </View>

        {/*Bagian tombol konfirmasi*/}
          <TouchableOpacity style={{marginTop:15}}
          onPress={()=>createNewBooking()}>
            <Text style={styles.confirmBtn}>Confirm & Book</Text>
          </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles= StyleSheet.create({
  calenderContainer:{
    backgroundColor:Colors.PRIMARY_LIGHT,
    padding:20,
    borderRadius:15,
  },
  selectedTime:{
    padding:10,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    paddingHorizontal:18,
    backgroundColor:Colors.PRIMARY,
    color:Colors.WHITE,
  },
  unSelectedTime:{
    padding:10,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    paddingHorizontal:18,
    color:Colors.PRIMARY,
  },
  noteTextArea:{
    borderWidth:1,
    borderRadius:15,
    textAlignVertical:'top',
    padding:20,
    fontSize:16,
    fontFamily:'Outfit-Regular',
    borderColor:Colors.PRIMARY,
  },
  confirmBtn:{
    textAlign:'center',
    fontFamily:'Outfit-Medium',
    fontSize:17,
    backgroundColor:Colors.PRIMARY,
    color:Colors.WHITE,
    padding:13,
    borderRadius:99,
    elevation:2,
  }
})