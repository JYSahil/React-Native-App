import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${movieId}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary}</Text>
      <Text style={styles.info}>Genres: {movie.genres.join(', ')}</Text>
      <Text style={styles.info}>Language: {movie.language}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  summary: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#777',
  },
});

export default DetailsScreen;
