import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ route }) => {
  const { searchTerm } = route.params;
  const [movies, setMovies] = useState([]);

  // Fetch movies based on search term
  useEffect(() => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error(error));
  }, [searchTerm]);

  const renderMovie = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.image} />
      <Text style={styles.title}>{item.show.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.show.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movieContainer: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default SearchScreen;
