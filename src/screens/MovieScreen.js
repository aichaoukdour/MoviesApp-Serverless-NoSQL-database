import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Constantes
const API_KEY = 'af70e27524ba9881bd3425aaaca532f4';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const COLORS = {
  primary: '#F9AA33',
  background: '#000',
  text: '#FFF',
  error: '#FF0000',
};
const FONTS = {
  regular: 'calibri',
};

// Function to convert numeric rating to stars
const renderRatingStars = (rating) => {
  const fullStars = Math.floor(rating / 2);
  const emptyStars = 5 - fullStars;
  const stars = [];
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={`full-${i}`} name="star" size={15} color={COLORS.primary} />);
  }
  
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={15} color={COLORS.primary} />);
  }
  
  return stars;
};

// Composant Header
const Header = ({ onBack, onWatchTrailer, onFavorite, isFavorite, onShowCinemas }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color={COLORS.text} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onWatchTrailer}>
      <FontAwesome name="youtube-play" size={24} color={COLORS.error} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onFavorite}>
      <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={COLORS.error} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onShowCinemas}>
      <Ionicons name="md-locate" size={24} color={COLORS.text} />
    </TouchableOpacity>
  </View>
);

// Composant MovieDetails
const MovieDetails = ({ movieDetails }) => (
  <View style={styles.detailsContainer}>
    <Text style={styles.title}>{movieDetails.title}</Text>

    <View style={styles.infoButtonsContainer}>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{movieDetails.release_date}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>{movieDetails.runtime} min</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>
          {movieDetails.genres.map((genre) => genre.name).join(', ')}
        </Text>
      </TouchableOpacity>
    </View>

    <Text style={styles.rating}>{renderRatingStars(movieDetails.vote_average)}</Text>

    <Text style={styles.sectionTitle}>Production Companies:</Text>
    <ScrollView horizontal style={styles.companyContainer}>
      {movieDetails.production_companies.map((company) => (
        company.logo_path && ( // Ensure the company has a logo before displaying
          <TouchableOpacity key={company.id} style={styles.companyButton}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
              style={styles.companyLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      ))}
    </ScrollView>

    <Text style={styles.overview}>{movieDetails.overview}</Text>
  </View>
);

// Composant CastList
const CastList = ({ cast, onActorPress }) => (
  <>
    <Text style={styles.sectionTitle}>Cast:</Text>
    <ScrollView horizontal style={styles.castContainer}>
      {cast.map((actor) => (
        <TouchableOpacity key={actor.id} onPress={() => onActorPress(actor.id)}>
          <View style={styles.actorContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }}
              style={styles.actorImage}
              resizeMode="cover"
            />
            <Text style={styles.actorName}>{actor.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </>
);

// Composant principal MovieScreen
const MovieScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
          axios.get(`${BASE_URL}${id}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}${id}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}${id}/videos?api_key=${API_KEY}`),
        ]);

        setMovieDetails(detailsResponse.data);
        setCast(creditsResponse.data.cast);

        const trailer = videosResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '');

        const favorites = await AsyncStorage.getItem('favorites');
        const favoriteMovies = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoriteMovies.some((movie) => movie.id === id));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => navigation.goBack();
  const handleWatchTrailer = () => trailerUrl ? Linking.openURL(trailerUrl) : alert('Trailer not available');
  const handleActorPress = (actorId) => navigation.navigate('ActorScreen', { id: actorId });
  const handleShowCinemas = () => navigation.navigate('CinemaMapScreen', { movieId: id });

  const handleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoriteMovies = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        const newFavorites = favoriteMovies.filter((movie) => movie.id !== id);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      } else {
        favoriteMovies.push(movieDetails);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoriteMovies));
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No movie details available.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container}>
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
              style={styles.poster}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
              style={styles.gradientOverlay}
            />
          </View>

          <Header
            onBack={handleBack}
            onWatchTrailer={handleWatchTrailer}
            onFavorite={handleFavorite}
            isFavorite={isFavorite}
            onShowCinemas={handleShowCinemas}
          />

          <MovieDetails movieDetails={movieDetails} />
          <CastList cast={cast} onActorPress={handleActorPress} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  posterContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: 450,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    padding: 5,
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 3, height: 6 }, // Slightly offset shadow
    shadowOpacity: 1, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  title: {
    fontSize: 35,
    marginBottom: 30,
    color: "white", // Main text color
    fontFamily: FONTS.regular,
    paddingHorizontal: 20,
    textShadowColor:  'rgb(255, 255, 255)', // Neon glow color
    textShadowOffset: { width: 2, height: 2 }, // Glow position
    textShadowRadius: 8, // Intensity of glow
  },
  
  infoButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  infoButton: {
    backgroundColor:"rgb(0, 0, 0)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
    shadowOpacity: 0.8, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
  },
  infoButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight:"bold",
    fontFamily: FONTS.regular,
  },
  rating: {
    fontSize: 12,
    marginBottom: 100,
    marginTop:"-27%",
    marginLeft:"68%",
    color: COLORS.text,
    fontFamily: FONTS.regular,
    paddingHorizontal: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  
  companyButton: {
    backgroundColor: 'rgb(255, 255, 255)',  // Dark background for button
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    marginLeft:10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "rgb(255, 255, 255)", // Light purple shadow color
    shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
    shadowOpacity: 0.8, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
    marginBottom: 20,
  },
  
  companyLogo: {
    width: 50,
    height: 20,
  },
  
  overview: {
    fontSize: 12,
    color: COLORS.text,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 7,
    color: COLORS.text,
    fontWeight:"bold",
    fontFamily: FONTS.regular,
    paddingHorizontal: 20,
  },
  castContainer: {
    paddingHorizontal: 20,
  },
  actorContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  actorImage: {
    width: 70,
    height: 80,
    borderRadius: 110, // Increase the borderRadius to make it rounded
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
    shadowOpacity: 0.8, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5, // For Android shadow
  },
  
  actorName: {
    marginTop: 5,
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MovieScreen;
