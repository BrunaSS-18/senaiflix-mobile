import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://img.freepik.com/vetores-gratis/cartaz-realista-de-cinema-com-balde-iluminado-de-pipoca-bebida-copos-3d-bobina-bilhetes-sobre-fundo-azul-com-ilustracao-vetorial-de-fitas_1284-77070.jpg' }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>SENAIFLIX</Text>
          <Text style={styles.subtitle}>
            Filmes e séries ilimitados. Assista onde quiser.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/catalogo')}>
            <Text style={styles.buttonText}>Entrar</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '95%',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 900,
  },

  content: {
    padding: 20,
  },

  title: {
    color: '#E50914',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#111',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  buttonArrow: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});