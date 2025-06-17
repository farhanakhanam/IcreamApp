// Farhana's Dessert App with Prices

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

// Dessert data with prices
const iceCreamImages = [
  { name: 'Strawberry Swirl', price: 99, uri: 'https://ohsweetbasil.com/wp-content/uploads/creamy-homemade-strawberry-ice-cream-recipe-6-scaled.jpg' },
  { name: 'Mango Masti', price: 89, uri: 'https://theflavoursofkitchen.com/wp-content/uploads/2021/06/Mango-Ice-cream-2-1.jpg' },
  { name: 'Vanilla Dream', price: 79, uri: 'https://barefeetinthekitchen.com/wp-content/uploads/2018/05/Easiest-Ice-Cream-1-1-of-1.jpg' },
  { name: 'Rainbow Delight', price: 109, uri: 'https://wallpapers.com/images/hd/ice-cream-pictures-93ucnuf5kr7ghmhg.jpg' },
  { name: 'Chocolate Blast', price: 99, uri: 'https://images4.fanpop.com/image/photos/24000000/ice-cream-Yummy-ice-cream-24070179-1600-1282.jpg' },
  { name: 'Almond Cream', price: 89, uri: 'https://wallpapercave.com/wp/76Mk7za.jpg' },
  { name: 'Berry Bliss', price: 109, uri: 'https://th.bing.com/th/id/OIP.u2dIKp1o5QgQmwDM5PAsagHaFj' },
];

const cakeImages = [
  { name: 'Chocolate Truffle', price: 149, uri: 'https://th.bing.com/th/id/OIP.1bZNspfoseb75Q-gL8tkZAHaJ4' },
  { name: 'Red Velvet', price: 159, uri: 'https://th.bing.com/th/id/OIP.uNQZfoh-kjfvsQ_Pn7Ba2QHaJQ' },
  { name: 'Black Forest', price: 139, uri: 'https://th.bing.com/th/id/OIP.0z0nrtekvi2G50aazW3HkAHaKy' },
  { name: 'Cheesecake', price: 169, uri: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb' },
  { name: 'Pineapple Cake', price: 129, uri: 'https://th.bing.com/th/id/OIP.eAvCvXlneVwBd5A5VeHYDQHaLG' },
  { name: 'Mango Cake', price: 139, uri: 'https://natashaskitchen.com/wp-content/uploads/2017/05/Mango-Cake-Recipe-3.jpg' },
  { name: 'Mixed Berry Cake', price: 159, uri: 'https://th.bing.com/th/id/OIP.BIF_S_FA3hA8Ljg5HNsJywHaLH' },
];

const pastryImages = [
  { name: 'Chocolate Eclair', price: 69, uri: 'https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/ANZ/calcmenu/recipes/AU-recipes/desserts-&-bakery/chocolate-eclairs/main-header.jpg' },
  { name: 'Fruit Danish', price: 59, uri: 'https://th.bing.com/th/id/OIP.g0pVE5l6Ro9csV0X4ZSfTQHaE8' },
  { name: 'Strawberry Tart', price: 79, uri: 'https://aseasyasapplepie.com/wp-content/uploads/2015/03/strawberry-tart-with-pastry-cream.jpg' },
  { name: 'Almond Croissant', price: 89, uri: 'https://th.bing.com/th/id/OIP.fO9FfAVhNMg1sSmZLdpwkAHaHa' },
  { name: 'Chocolate Puff', price: 75, uri: 'https://www.sugarsaltmagic.com/wp-content/uploads/2024/02/Chocolate-Puff-Pastries-16FEAT-500x500.jpg' },
];

const cheesecakeImages = [
  { name: 'Classic New York', price: 189, uri: 'https://i.pinimg.com/originals/0c/09/af/0c09afd6ef2745b1515088546d58d502.jpg' },
  { name: 'Blueberry Cheesecake', price: 199, uri: 'https://www.lifeloveandsugar.com/wp-content/uploads/2021/03/Blueberry-Cheesecake4.jpg' },
  { name: 'Strawberry Cheesecake', price: 189, uri: 'https://th.bing.com/th/id/OIP.nhDnvhl26oAXZypz5S1NnQHaLH' },
  { name: 'Chocolate Cheesecake', price: 209, uri: 'https://www.shugarysweets.com/wp-content/uploads/2020/02/no-bake-chocolate-cheesecake-6.jpg' },
  { name: 'Oreo Cheesecake', price: 199, uri: 'https://th.bing.com/th/id/OIP.M9Ebocoy7rIRRLbKX8jSWwHaLH' },
];

export default function App() {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const exists = cart.find(c => c.name === item.name);
    if (exists) {
      setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (item) => {
    setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
  };

  const decreaseQty = (item) => {
    const updated = cart.map(c =>
      c.name === item.name ? { ...c, qty: c.qty - 1 } : c
    ).filter(c => c.qty > 0);
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

      {/* LOGIN PAGE */}
      {screen === 'login' && (
        <>
          <Animatable.Text animation="fadeInDown" style={styles.title}>👋 Welcome Back!</Animatable.Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }}
            style={{ width: 100, height: 100, marginVertical: 20 }}
          />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
          <Pressable style={styles.button} onPress={() => {
            if (!email || !password) {
              Alert.alert('Missing Fields', 'Please fill both fields.');
            } else {
              setScreen('landing');
            }
          }}>
            <Text style={styles.buttonText}>🔓 Login</Text>
          </Pressable>
        </>
      )}

      {/* LANDING PAGE */}
      {screen === 'landing' && (
        <>
          <Animatable.Text animation="fadeInDown" style={styles.greeting}>Hello, {email.split('@')[0]}!</Animatable.Text>
          <Animatable.Text animation="bounceIn" style={styles.title}>🍰 Welcome to Farhana's Dessert World</Animatable.Text>
          <Image source={{ uri: 'https://th.bing.com/th/id/OIP.otxSLbzSTxdQqfklBJpENwHaEK?w=324&h=182&c=7&r=0&o=7&pid=1.7&rm=3' }} style={{ width: 250, height: 200, borderRadius: 10, marginBottom: 20 }} />
          <Pressable style={styles.button} onPress={() => setScreen('home')}>
            <Text style={styles.buttonText}>🍨 Explore Desserts</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={() => setScreen('login')}>
            <Text style={styles.buttonText}>🔙 Logout</Text>
          </Pressable>
        </>
      )}

      {/* HOME SCREEN */}
      {screen === 'home' && (
        <>
          <Animatable.Text animation="fadeInDown" style={styles.title}>🍬 Pick Your Favorites</Animatable.Text>
          <View style={styles.categorySwitch}>
            {['icecream', 'cake', 'pastry', 'cheesecake'].map(cat => (
              <Pressable key={cat} style={[styles.categoryBtn, category === cat && styles.activeTab]} onPress={() => setCategory(cat)}>
                <Text style={styles.tabText}>{{
                  icecream: 'Ice Creams',
                  cake: 'Cakes',
                  pastry: 'Pastries',
                  cheesecake: 'Cheesecakes',
                }[cat]}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput placeholder="Search desserts..." value={search} onChangeText={setSearch} style={styles.input} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredItems.map((item, index) => (
              <Animatable.View key={index} animation="bounceIn" delay={index * 100} style={styles.card}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <Pressable style={styles.button} onPress={() => addToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart 🛒</Text>
                </Pressable>
              </Animatable.View>
            ))}
          </ScrollView>
          <Pressable style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={() => setScreen('cart')}>
            <Text style={styles.buttonText}>🛒 View Cart ({cart.reduce((t, i) => t + i.qty, 0)})</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#999' }]} onPress={() => setScreen('landing')}>
            <Text style={styles.buttonText}>🔙 Back</Text>
          </Pressable>
        </>
      )}

      {/* CART SCREEN */}
      {screen === 'cart' && (
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
                  <Text style={styles.price}>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</Text>
                  <View style={styles.qtyContainer}>
                    <Pressable onPress={() => decreaseQty(item)} style={styles.qtyBtn}><Text style={styles.buttonText}>−</Text></Pressable>
                    <Text style={styles.label}>{item.qty}</Text>
                    <Pressable onPress={() => increaseQty(item)} style={styles.qtyBtn}><Text style={styles.buttonText}>+</Text></Pressable>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
          {cart.length > 0 && (
            <Text style={[styles.title, { color: '#333' }]}>
              Total: ₹{cart.reduce((total, item) => total + item.price * item.qty, 0)}
            </Text>
          )}
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

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff0f5', alignItems: 'center', padding: 20 },
  scrollContainer: { alignItems: 'center', paddingBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#d63384', marginVertical: 15, textAlign: 'center' },
  greeting: { fontSize: 30, fontWeight: 'bold', color: "#d63384", marginTop: 10, marginBottom: 5, textAlign: 'center' },
  label: { fontSize: 16, color: '#333', marginVertical: 8, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, paddingVertical: 8, marginBottom: 10, width: '100%', backgroundColor: '#fff' },
  image: { width: 200, height: 200, borderRadius: 20, marginBottom: 10, borderWidth: 2, borderColor: '#ffc0cb', resizeMode: 'cover' },
  card: { alignItems: 'center', marginBottom: 20, backgroundColor: '#fff', padding: 12, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, width: 240 },
  button: { backgroundColor: '#ff69b4', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginVertical: 6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cartItem: { alignItems: 'center', marginBottom: 20, backgroundColor: '#ffe4e1', padding: 10, borderRadius: 15 },
  cartImage: { width: 150, height: 150, borderRadius: 12, marginBottom: 8, borderWidth: 2, borderColor: '#ff69b4' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { backgroundColor: '#ff69b4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  categorySwitch: { flexDirection: 'row', marginBottom: 10, justifyContent: 'center', flexWrap: 'wrap' },
  categoryBtn: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#eee', borderRadius: 20, margin: 5 },
  activeTab: { backgroundColor: '#ff69b4' },
  tabText: { color: '#333', fontWeight: 'bold' },
  price: { fontSize: 16, color: '#d63384', fontWeight: '600' },
});
