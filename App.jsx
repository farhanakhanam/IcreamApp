import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

// 🍨 Ice Cream Items
const iceCreamImages = [
  { name: 'Strawberry Swirl', uri: 'https://ohsweetbasil.com/wp-content/uploads/creamy-homemade-strawberry-ice-cream-recipe-6-scaled.jpg' },
  { name: 'Mango Masti', uri: 'https://theflavoursofkitchen.com/wp-content/uploads/2021/06/Mango-Ice-cream-2-1.jpg' },
  { name: 'Vanilla Dream', uri: 'https://barefeetinthekitchen.com/wp-content/uploads/2018/05/Easiest-Ice-Cream-1-1-of-1.jpg' },
  { name: 'Rainbow Delight', uri: 'https://wallpapers.com/images/hd/ice-cream-pictures-93ucnuf5kr7ghmhg.jpg' },
  { name: 'Chocolate Blast', uri: 'https://images4.fanpop.com/image/photos/24000000/ice-cream-Yummy-ice-cream-24070179-1600-1282.jpg' },
  { name: 'Almond Cream', uri: 'https://wallpapercave.com/wp/76Mk7za.jpg' },
  { name: 'Berry Bliss', uri: 'https://th.bing.com/th/id/OIP.u2dIKp1o5QgQmwDM5PAsagHaFj?r=0&rs=1&pid=ImgDetMain' },
];

// 🎂 Cake Items
const cakeImages = [
  { name: 'Chocolate Truffle', uri: 'https://th.bing.com/th/id/OIP.1bZNspfoseb75Q-gL8tkZAHaJ4' },
  { name: 'Red Velvet', uri: 'https://th.bing.com/th/id/OIP.uNQZfoh-kjfvsQ_Pn7Ba2QHaJQ' },
  { name: 'Black Forest', uri: 'https://th.bing.com/th/id/OIP.0z0nrtekvi2G50aazW3HkAHaKy' },
  { name: 'Cheesecake', uri: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb' },
  { name: 'Pineapple Cake', uri: 'https://th.bing.com/th/id/OIP.eAvCvXlneVwBd5A5VeHYDQHaLG' },
  { name: 'Mango Cake', uri: 'https://natashaskitchen.com/wp-content/uploads/2017/05/Mango-Cake-Recipe-3.jpg' },
  { name: 'Mixed Berry Cake', uri: 'https://th.bing.com/th/id/OIP.BIF_S_FA3hA8Ljg5HNsJywHaLH' },
];

// 🥐 Pastry Items
const pastryImages = [
  { name: 'Chocolate Éclair', uri: 'https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/ANZ/calcmenu/recipes/AU-recipes/desserts-&-bakery/chocolate-eclairs/main-header.jpg' },
  { name: 'Fruit Danish', uri: 'https://th.bing.com/th/id/OIP.g0pVE5l6Ro9csV0X4ZSfTQHaE8?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc1' },
  { name: 'Strawberry Tart', uri: 'https://aseasyasapplepie.com/wp-content/uploads/2015/03/strawberry-tart-with-pastry-cream.jpg' },
  { name: 'Almond Croissant', uri: 'https://th.bing.com/th/id/OIP.fO9FfAVhNMg1sSmZLdpwkAHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc1' },
  { name: 'Chocolate Puff', uri: 'https://www.sugarsaltmagic.com/wp-content/uploads/2024/02/Chocolate-Puff-Pastries-16FEAT-500x500.jpg' },
];

// 🍰 Cheesecake Items
const cheesecakeImages = [
  { name: 'Classic New York', uri: 'https://i.pinimg.com/originals/0c/09/af/0c09afd6ef2745b1515088546d58d502.jpg' },
  { name: 'Blueberry Cheesecake', uri: 'https://www.lifeloveandsugar.com/wp-content/uploads/2021/03/Blueberry-Cheesecake4.jpg' },
  { name: 'Strawberry Cheesecake', uri: 'https://th.bing.com/th/id/OIP.nhDnvhl26oAXZypz5S1NnQHaLH?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc1' },
  { name: 'Chocolate Cheesecake', uri: 'https://www.shugarysweets.com/wp-content/uploads/2020/02/no-bake-chocolate-cheesecake-6.jpg' },
  { name: 'Oreo Cheesecake', uri: 'https://th.bing.com/th/id/OIP.M9Ebocoy7rIRRLbKX8jSWwHaLH' },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('icecream');

  const allItems = {
    icecream: iceCreamImages,
    cake: cakeImages,
    pastry: pastryImages,
    cheesecake: cheesecakeImages,
  };

  const items = allItems[category] || [];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
      setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (item) => {
    setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
  };

  const decreaseQty = (item) => {
    const updated = cart.map(c => {
      if (c.name === item.name) {
        return { ...c, qty: c.qty - 1 };
      }
      return c;
    }).filter(c => c.qty > 0);
    setCart(updated);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Please add items before ordering.');
    } else {
      Alert.alert('Order Placed 🎉', 'Thanks for ordering!');
      setCart([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {screen === 'home' ? (
        <>
          <Animatable.Text animation="fadeInDown" style={styles.title}>
            🍰 Welcome to Farhana's Dessert World!
          </Animatable.Text>

          <View style={styles.categorySwitch}>
            {['icecream', 'cake', 'pastry', 'cheesecake'].map(cat => (
              <Pressable
                key={cat}
                style={[styles.categoryBtn, category === cat && styles.activeTab]}
                onPress={() => setCategory(cat)}
              >
                <Text style={styles.tabText}>
                  {{
                    icecream: 'Ice Creams',
                    cake: 'Cakes',
                    pastry: 'Pastries',
                    cheesecake: 'Cheesecakes',
                  }[cat]}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            placeholder="Search desserts..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredItems.map((item, index) => (
              <Animatable.View key={index} animation="bounceIn" delay={index * 100} style={styles.card}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.label}>{item.name}</Text>
                <Pressable style={styles.button} onPress={() => addToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart 🛒</Text>
                </Pressable>
              </Animatable.View>
            ))}
          </ScrollView>

          <Pressable style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={() => setScreen('cart')}>
            <Text style={styles.buttonText}>🛒 View Cart ({cart.reduce((t, i) => t + i.qty, 0)})</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Animatable.Text animation="pulse" style={styles.title}>🛒 Your Cart</Animatable.Text>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {cart.length === 0 ? (
              <Text style={styles.label}>Your cart is empty</Text>
            ) : (
              cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Image source={{ uri: item.uri }} style={styles.cartImage} />
                  <Text style={styles.label}>{item.name}</Text>
                  <View style={styles.qtyContainer}>
                    <Pressable onPress={() => decreaseQty(item)} style={styles.qtyBtn}>
                      <Text style={styles.buttonText}>−</Text>
                    </Pressable>
                    <Text style={styles.label}>{item.qty}</Text>
                    <Pressable onPress={() => increaseQty(item)} style={styles.qtyBtn}>
                      <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </ScrollView>

          <Pressable style={styles.button} onPress={placeOrder}>
            <Text style={styles.buttonText}>✅ Place Order</Text>
          </Pressable>

          <Pressable style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={() => setScreen('home')}>
            <Text style={styles.buttonText}>🔙 Back</Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d63384',
    marginVertical: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ffc0cb',
    resizeMode: 'cover',
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 240,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffe4e1',
    padding: 10,
    borderRadius: 15,
  },
  cartImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#ff69b4',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    backgroundColor: '#ff69b4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categorySwitch: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#ff69b4',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
