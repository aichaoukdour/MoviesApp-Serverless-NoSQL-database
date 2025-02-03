import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

const MovieCard = ({ movie, handleClick }) => {
  const { width } = Dimensions.get('window');
  const voteAveragePercentage = Math.round(movie.vote_average * 10); // Convert vote average to percentage

  // Adjust card height and width for proper image display
  const cardWidth = width * 0.4; // Card width set to 80% of screen width
  const cardHeight = cardWidth * 1.6; // Card height based on the width (aspect ratio for posters)

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(movie)}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        {/* Image */}
        <Image
          style={styles.image}
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          resizeMode="contain" // Ensures the image is scaled down to fit inside the card
        />
        
        {/* Rating badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingBadgeText}>{voteAveragePercentage}%</Text>
        </View>

        {/* Title below the image */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    position: 'relative',
    // Shadow properties for iOS
    shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
    shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
    shadowOpacity: 0.8, // Lower opacity for a softer shadow
    shadowRadius: 20, // Increase radius to create a blurred shadow
    elevation: 5,
  },
  image: {
    width: '100%', // Image fills the width of the card
    height: '100%', // Image fills the height of the card
  },
  ratingBadge: {
    position: 'absolute',
    top: 0.1,
    right: -10,
backgroundColor: "rgb(251, 247, 0)",
    background: "linear-gradient(55deg,  rgb(254, 197, 241) 0%,rgb(255, 3, 196) 0%, rgb(98, 0, 255) 100%, rgba(105, 6, 198, 1) 50%)",
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 2,

    zIndex: 2,
  },
  ratingBadgeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0, // Place the title container at the bottom of the card
    width: '100%',
    height: '10%',
  
    padding: 5,
    backgroundColor: 'rgb(0, 0, 0)', // Semi-transparent background
    zIndex: 1, // Ensure the title is visible above the image
  },
  title: {
    fontSize: 13,
   // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default MovieCard;
