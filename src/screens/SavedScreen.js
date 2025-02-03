import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const SavedScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      setFavorites(favorites ? JSON.parse(favorites) : []);
    };

    const unsubscribe = navigation.addListener('focus', fetchFavorites);

    return unsubscribe;
  }, [navigation]);

  const handleRemoveFavorite = async (id) => {
    const newFavorites = favorites.filter(movie => movie.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorite movies added yet.</Text>
      ) : (
        favorites.map(movie => (
          <View key={movie.id} style={styles.movieContainer}>
            <TouchableOpacity
              style={styles.posterContainer}
              onPress={() => navigation.navigate('MovieScreen', { id: movie.id })}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(movie.id)}
            >
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    shadowColor: "rgb(238, 0, 255)",
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',
    fontFamily: 'calibri',
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'calibri',
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  posterContainer: {
    flex: 1,
  },
  poster: {
    width: '90%',
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
    fontFamily: 'calibri',
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 20,
  },
});

export default SavedScreen;
