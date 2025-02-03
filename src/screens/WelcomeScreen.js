import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import for Play Icon

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#100F1F", justifyContent: "flex-end", alignItems: "center" }}>
      
      {/* Background Image */}
      <Image
        source={require("../../assets/welcome.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {/* Content Section */}
      <View style={{ alignItems: "center", paddingBottom: 80, paddingHorizontal: 20 }}>
        
        {/* Play Icon with Shadow */}
        <View style={{
          backgroundColor: "rgb(105, 6, 198)",
          width: 50,
          background: "linear-gradient(55deg,  rgb(254, 197, 241) 0%,rgb(255, 3, 196) 0%, rgb(98, 0, 255) 100%, rgba(105, 6, 198, 1) 50%)",
          height: 50,
          borderRadius: 35,
          alignItems: "center",
          justifyContent: "center",
           // Lighter, blurred shadow
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
    shadowOpacity: 0.8, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5, // For Android, ensure shadow is visible
        }}>
          <Ionicons name="play" size={34} color="#fff" />
        </View>

        {/* App Title */}
        <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold", letterSpacing: 0, marginTop: -7}}>
          M<Text style={{ color: "rgb(105, 6, 198)", fontWeight: "bold" }}>\/</Text>
        </Text>

        {/* Description */}
        <Text style={{ color: "white", fontSize: 8, textAlign: "center", marginTop: 8 }}>
          Watch unlimited movies, series & TV shows anywhere, anytime
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={{ width: "90%", paddingHorizontal: 20, marginBottom: 90 }}>
        
        {/* Login & Subscribe Button with Indigo and Purple Gradient */}
        <TouchableOpacity
          style={{
            paddingVertical: 14,
            borderRadius: 10,
            marginBottom: 12,
            marginLeft: '20%',
            width: "65%",
            alignItems: "center",
            backgroundColor: "rgb(70, 0, 130)", // Set the base color
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 5,
            // Add gradient using a 'background' image or other styles
            background: "linear-gradient(55deg,  rgb(254, 197, 241) 0%,rgb(255, 3, 196) 0%, rgb(98, 0, 255) 100%, rgba(105, 6, 198, 1) 50%)"
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Login & Subscribe</Text>
        </TouchableOpacity>

        {/* Try as Guest Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(10, 6, 10)",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            shadowColor: " rgb(255, 3, 255)",
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            marginLeft: '20%',
            width: "65%",
            elevation: 3
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight:"bold"}}>Try as Guest!</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
