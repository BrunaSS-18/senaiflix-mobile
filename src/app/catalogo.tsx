import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { BuscarFilmes } from '../api/get-catalogo';

export default function Catalogo() {
  const router = useRouter();

  const { data: filmes, isLoading, isError } = useQuery({
    queryKey: ['filmes'],
    queryFn: BuscarFilmes,
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Erro ao carregar o catálogo de filmes.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SENAIFLIX</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.sectionTitle}>Catálogo</Text>
      </View>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => router.push(`/filme/${item.id}`)}
          >

            <Image 
              source={{ uri: item.poster }} 
              style={styles.poster}
              resizeMode="cover" 
            />

            <View style={styles.infoContainer}>
              <Text style={styles.movieTitle}>{item.nome}</Text>
              
              <Text style={styles.metaText}>
                {item.ano} · {item.duracao}
              </Text>

              <View style={styles.genreBadge}>
                <Text style={styles.genreText}>{item.genero}</Text>
              </View>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  errorText: {
    fontSize: 16,
    color: '#333333',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#F3F3F3',
  },
  headerTitle: {
    color: '#E50914',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#EBEBEB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#F3F3F3',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  genreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  genreText: {
    fontSize: 12,
    color: '#333333',
  },
  arrow: {
    fontSize: 24,
    color: '#111111',
    marginLeft: 8,
  },
});