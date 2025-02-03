import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-web-linear-gradient';
 // Import the LinearGradient component

const API_KEY = 'af70e27524ba9881bd3425aaaca532f4';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const starCount = Math.round(rating / 2); // Normalize to 5-star rating system
    return (
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <Text key={index} style={index < starCount ? styles.fullStar : styles.emptyStar}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultContainer}
      onPress={() => navigation.navigate('MovieScreen', { id: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        {renderStars(item.vote_average)} {/* Show stars based on rating */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for movies..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {/* Use LinearGradient to apply gradient background */}
      <LinearGradient 
        //colors={['rgb(151, 1, 215)', 'rgb(237, 61, 253)', 'rgb(117, 2, 178)', 'rgb(162, 1, 249)']}  // Define your gradient colors
        style={{
          paddingVertical: 14,
          borderRadius: 10,
          marginBottom: 12,
          marginLeft: '25%',
          width: "50%",
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
      >
        <TouchableOpacity onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </LinearGradient>

      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'rgb(230, 58, 249)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  /*searchButton: {
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width:"50%",
    alignItems: 'center',
  },*/
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 3, height: 6 }, // Slightly offset shadow
    shadowOpacity: 0.5, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
    backgroundColor: '#000',
    padding: 10,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Times New Roman',
    flex: 1,
  },
  stars: {
    flexDirection: 'row',
  },
  fullStar: {
    color: '#F9AA33', // Yellow color for full stars
    fontSize: 20,
  },
  emptyStar: {
    color: '#888', // Light gray for empty stars
    fontSize: 20,
  },
});

export default SearchScreen;
