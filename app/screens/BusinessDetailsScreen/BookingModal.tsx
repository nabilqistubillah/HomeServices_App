import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "@/app/Utils/Colors";
import Heading from "@/app/Components/Heading";
import { TextInput } from "react-native-gesture-handler";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";

type BookingModalProps = {
  businessId: string;
  hideModal: () => void;
};

const BookingModal = ({ businessId, hideModal }: BookingModalProps) => {
  const [timeList, setTimeList] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [note, setNote] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const times = [];
    for (let i = 8; i <= 12; i++) {
      times.push({ time: i + ":00 AM" });
      times.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 7; i++) {
      times.push({ time: i + ":00 PM" });
      times.push({ time: i + ":30 PM" });
    }
    setTimeList(times);
  };

  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please select date and time!", ToastAndroid.LONG);
      return;
    }

    const simulatedBooking = {
      userName: user?.fullName || "Guest",
      userEmail: user?.primaryEmailAddress?.emailAddress,
      time: selectedTime,
      date: moment(selectedDate).format("YYYY-MM-DD"),
      note,
      businessId,
    };

    console.log("Simulated Booking:", simulatedBooking);
    ToastAndroid.show("Booking Created Successfully!", ToastAndroid.LONG);

    // Optional: Reset form
    setSelectedDate(null);
    setSelectedTime(null);
    setNote("");
    hideModal();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Header */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "Outfit-Medium" }}>
            Booking
          </Text>
        </TouchableOpacity>

        {/* Calendar Picker */}
        <Heading text={"Select Date"} />
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={300}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>

        {/* Time Slot Selection */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time Slot"} />
          <FlatList
            data={timeList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={
                    item.time === selectedTime
                      ? styles.selectedTime
                      : styles.unSelectedTime
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note?"} />
          <TextInput
            placeholder="Note"
            numberOfLines={4}
            multiline
            style={styles.noteTextArea}
            value={note}
            onChange={(e) => setNote(e.nativeEvent.text)}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={{ marginTop: 15 }} onPress={createNewBooking}>
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookingModal;

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "Outfit-Regular",
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "Outfit-Medium",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
