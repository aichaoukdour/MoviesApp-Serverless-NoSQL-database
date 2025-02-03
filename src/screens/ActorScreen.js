import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'af70e27524ba9881bd3425aaaca532f4';

const ActorScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [actorDetails, setActorDetails] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBiographyExpanded, setBiographyExpanded] = useState(false); // State for biography expansion

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const [actorResponse, movieResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`)
        ]);

        setActorDetails(actorResponse.data);
        setMovies(movieResponse.data.cast);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching actor details or movies:', error);
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!actorDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No actor details available.</Text>
      </View>
    );
  }

  const handleBiographyToggle = () => {
    setBiographyExpanded(!isBiographyExpanded); // Toggle the biography view
  };

  // Render movie item with poster image
  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.moviePoster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backButtonText}></Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${actorDetails.profile_path}` }}
          style={styles.actorImage}
        />
      </View>
      <Text style={styles.name}>{actorDetails.name}</Text>

      <Text style={styles.biography} numberOfLines={isBiographyExpanded ? 0 : 2}>
        {actorDetails.biography}
      </Text>

      {actorDetails.biography.length > 200 && !isBiographyExpanded && (
        <TouchableOpacity onPress={handleBiographyToggle}>
          <Text style={styles.readMoreButton}>Read More</Text>
        </TouchableOpacity>
      )}

      {isBiographyExpanded && (
        <TouchableOpacity onPress={handleBiographyToggle}>
          <Text style={styles.readMoreButton}>Read Less</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Movies:</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: "10%",
    borderRadius: 5,
    marginRight: 10,
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 3, height: 6 }, // Slightly offset shadow
    shadowOpacity: 1, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
    backgroundColor: '#000',
    color: "rgb(195, 0, 255)"
  },
  backButtonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 18,
    marginLeft: 10,
  },
  imageContainer: {
    shadowColor: 'rgb(174, 0, 255)',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    width: 200, 
    height: 200,
    borderRadius: 100, 
    elevation: 10,
  },
  actorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    color: 'rgb(255, 255, 255)',
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: 'calibri',
    marginTop: 10
  },
  biography: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'calibri',
  },
  readMoreButton: {
    fontSize: 16,
    color: '#F9AA33',
    marginBottom: 10,
    marginTop: -10,
    fontFamily: 'calibri',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: 'calibri',
    color: 'rgb(255, 255, 255)',
    marginBottom: 10,
  },
  movieItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    fontFamily: 'calibri',
    textAlign: 'center',
  },
  noMoviesText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'calibri',
  },
  errorText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'calibri',
  },
});

export default ActorScreen;
