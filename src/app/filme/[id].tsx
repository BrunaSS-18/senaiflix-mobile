import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BuscarFilme } from '../../api/get-filmes';
import { useQuery } from '@tanstack/react-query';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Filme() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["filme", id],
    queryFn: () => BuscarFilme(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do filme.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      <Image 
        source={{ uri: data.poster }} 
        style={styles.banner} 
        resizeMode="cover" 
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.nome}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{data.ano}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.metaText}>{data.duracao}</Text>
          <Text style={styles.dot}>·</Text>
          <View style={styles.ageBadge}>
            <Text style={styles.ageBadgeText}>{data.classificacao || '14'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.watchButton} activeOpacity={0.8}>
          <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.watchButtonText}>Assistir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listButton} activeOpacity={0.8}>
          <Ionicons name="add" size={22} color="#111111" style={{ marginRight: 6 }} />
          <Text style={styles.listButtonText}>Minha lista</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>SINOPSE</Text>
        <Text style={styles.description}>{data.descricao}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gênero</Text>
          <Text style={styles.infoValue}>{data.genero}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Direção</Text>
          <Text style={styles.infoValue}>{data.direcao}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  contentContainer: {
    paddingBottom: 40,
  },
  
  errorText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  banner: {
    width: '100%',
    height: 220,
    backgroundColor: '#E0E0E0',
  },

  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  metaText: {
    fontSize: 16,
    color: '#666666',
  },

  dot: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#666666',
  },

  ageBadge: {
    borderWidth: 1,
    borderColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },

  ageBadgeText: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: 'bold',
  },

  watchButton: {
    backgroundColor: '#E52313',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 10,
  },

  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  listButton: {
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 16,
  },

  listButtonText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  description: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  infoLabel: {
    width: 90,
    fontSize: 15,
    color: '#666666',
  },

  infoValue: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
    fontWeight: '500',
  },
});