import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';

// Иконки
import Icon from 'react-native-vector-icons/Ionicons';

// Моковые данные
const MOCK_BANNER = {
  image: 'https://placehold.co/400x200/6C5CE7/FFFFFF?text=ЭЛЕКТРОННЫЕ+ЧАСЫ',
  title: 'Электронные часы',
  subtitle: 'Современный взгляд на время',
};

const MOCK_CATEGORIES = [
  { id: '1', name: 'Бытовая техника' },
  { id: '2', name: 'Электроника' },
  { id: '3', name: 'Умный дом' },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Беспроводные наушники',
    price: 2490,
    image: 'https://placehold.co/200x200/4A90E2/FFFFFF?text=🎧',
  },
  {
    id: '2',
    name: 'Умная лампочка',
    price: 890,
    image: 'https://placehold.co/200x200/50C878/FFFFFF?text=💡',
  },
  {
    id: '3',
    name: 'Зарядное устройство',
    price: 1290,
    image: 'https://placehold.co/200x200/FF6F61/FFFFFF?text=🔌',
  },
  {
    id: '4',
    name: 'Bluetooth-колонка',
    price: 3990,
    image: 'https://placehold.co/200x200/9B59B6/FFFFFF?text=🎵',
  },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    Alert.alert('✅', `${product.name} добавлен в корзину!`);
  };

  const toggleFavorite = (product) => {
    if (favorites.find((p) => p.id === product.id)) {
      setFavorites(favorites.filter((p) => p.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const filteredProducts = MOCK_PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхняя панель */}
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#fff" />
        <Text style={styles.title}>Sima-Land Clone</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Поиск */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Найдите нужное"
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Баннер */}
      <View style={styles.banner}>
        <Image source={{ uri: MOCK_BANNER.image }} style={styles.bannerImage} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>{MOCK_BANNER.title}</Text>
          <Text style={styles.bannerSubtitle}>{MOCK_BANNER.subtitle}</Text>
        </View>
      </View>

      {/* Категории */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Каталог / Бытовая техника и электроника</Text>
        <FlatList
          data={MOCK_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Товары */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} ₽</Text>
            <View style={styles.productActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.favoriteButton]}
                onPress={() => toggleFavorite(item)}
              >
                <Icon
                  name={favorites.find((p) => p.id === item.id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={favorites.find((p) => p.id === item.id) ? '#e74c3c' : '#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cartButton]}
                onPress={() => addToCart(item)}
              >
                <Icon name="cart-outline" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Нижняя навигация */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="search" size={24} color="#fff" />
          <Text style={styles.navText}>Поиск</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="heart-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Избранное</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="cart-outline" size={24} color="#fff" />
          <Text style={styles.navText}>Корзина</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c14', // тёмный фон
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1a1423',
    borderBottomWidth: 1,
    borderBottomColor: '#3a2d4b',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#1a1423',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3a2d4b',
  },
  searchIcon: {
    marginRight: 8,
    color: '#aaa',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  banner: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  bannerImage: {
    width: '100%',
    height: 160,
  },
  bannerText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#6C5CE7',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  categories: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  categoryButton: {
    backgroundColor: '#3a2d4b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
  },
  productsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  productCard: {
    backgroundColor: '#1a1423',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3a2d4b',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: 160,
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#fff',
  },
  productPrice: {
    fontSize: 16,
    color: '#6C5CE7',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    padding: 6,
    borderRadius: 8,
  },
  favoriteButton: {
    backgroundColor: '#3a2d4b',
  },
  cartButton: {
    backgroundColor: '#6C5CE7',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1a1423',
    borderTopWidth: 1,
    borderTopColor: '#3a2d4b',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#fff',
  },
});
