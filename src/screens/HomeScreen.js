import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { MagnifyingGlassIcon, BellIcon } from 'react-native-heroicons/outline';
import MovieCard from '../components/MovieCard';
import { getAuth, signOut } from "firebase/auth";

const API_KEY = 'af70e27524ba9881bd3425aaaca532f4';
const { width } = Dimensions.get('window');

const fetchMovies = async (category) => {
  const urls = {
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  };

  try {
    const response = await fetch(urls[category]);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};

const HomeScreen = ({ navigation }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchMovies('trending').then(setTrendingMovies);
    fetchMovies('upcoming').then(setUpcomingMovies);
    fetchMovies('top_rated').then(setTopRatedMovies);
    fetchMovies('popular').then(setPopularMovies);
  }, []);

  const handleClick = (movie) => {
    navigation.navigate('MovieScreen', { id: movie.id });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.replace('Login');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../../assets/download.jpeg')} style={styles.backgroundImage} resizeMode="cover" />
      <View style={styles.overlay} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer} onPress={toggleMenu}>
            <Image source={require('../../assets/avatar.jpg')} style={styles.avatar} resizeMode="cover" />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" style={styles.icon} />
            </TouchableOpacity>
            <BellIcon size={30} strokeWidth={2} color="white" style={styles.icon} />
          </View>
        </View>

        {isMenuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.heading}>Trending Now 🔥</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardList}>
          {trendingMovies.map(movie => <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />)}
        </ScrollView>

        <Text style={styles.heading}>Coming Soon</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardList}>
          {upcomingMovies.map(movie => <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />)}
        </ScrollView>

        <Text style={styles.heading}>Top Rated Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardList}>
          {topRatedMovies.map(movie => <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />)}
        </ScrollView>

        <Text style={styles.heading}>Popular Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardList}>
          {popularMovies.map(movie => <MovieCard key={movie.id} movie={movie} handleClick={handleClick} />)}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  heading: {
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
  cardList: {
    flexDirection: 'row',
    height: 290,
    paddingBottom: 20,
  },
});

export default HomeScreen;
