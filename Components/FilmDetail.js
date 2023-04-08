import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi';
import numeral from 'numeral';

const FilmDetail = ({ route }) => {
  const { film } = route.params;
  const navigation = useNavigation();
//affiche les informations de base d'un film 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: getImageFromApi(film.poster_path) }} style={styles.poster} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.tagline}>{film.tagline}</Text>
        
        <View style={styles.genreContainer}>
        </View>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overview}>{film.overview}</Text>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Release date:</Text> {film.release_date}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoLabel}>Runtime:</Text> {numeral(film.runtime).format('2h')} min
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

export default FilmDetail;