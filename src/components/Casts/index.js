import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

const Cast = ({ cast }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
      {cast.map((actor, index) => (
        <TouchableOpacity key={index} style={{ marginRight: 15 }} onPress={() => handleActorPress(actor)}>
          <View>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
              resizeMode="cover"
            />
            <Text style={{ marginTop: 5, fontSize: 14, fontWeight: "bold" }}>{actor.name}</Text>
            <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{actor.character}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Cast;
