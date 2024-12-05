import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  // Fetch movies data from the API
  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle movie click to navigate to Details screen
  const handleMoviePress = (movieId) => {
    navigation.navigate('Details', { movieId });
  };

  // Handle search bar submission
  const handleSearch = () => {
    if (searchTerm) {
      navigation.navigate('Search', { searchTerm });
    }
  };

  // Render individual movie items
  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item.show.id)}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image?.medium }} style={styles.image} />
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary}>{item.show.summary?.substring(0, 100)}...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
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
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
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
  summary: {
    color: '#555',
  },
});

export default HomeScreen;
