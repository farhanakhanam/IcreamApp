// Farhana's Dessert App (With descriptions)

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

// Dessert data with prices and descriptions
const iceCreamImages = [
  { name: 'Strawberry Swirl', price: 99, uri: 'https://ohsweetbasil.com/wp-content/uploads/creamy-homemade-strawberry-ice-cream-recipe-6-scaled.jpg', description: 'A creamy treat bursting with fresh strawberry flavor.' },
  { name: 'Mango Masti', price: 89, uri: 'https://theflavoursofkitchen.com/wp-content/uploads/2021/06/Mango-Ice-cream-2-1.jpg', description: 'Rich mango ice cream with tropical vibes.' },
  { name: 'Vanilla Dream', price: 79, uri: 'https://barefeetinthekitchen.com/wp-content/uploads/2018/05/Easiest-Ice-Cream-1-1-of-1.jpg', description: 'Classic vanilla smoothness everyone loves.' },
  { name: 'Rainbow Delight', price: 109, uri: 'https://wallpapers.com/images/hd/ice-cream-pictures-93ucnuf5kr7ghmhg.jpg', description: 'A colorful swirl of multiple fruity flavors.' },
  { name: 'Chocolate Blast', price: 99, uri: 'https://images4.fanpop.com/image/photos/24000000/ice-cream-Yummy-ice-cream-24070179-1600-1282.jpg', description: 'Loaded with rich chocolate for chocoholics.' },
  { name: 'Almond Cream', price: 89, uri: 'https://wallpapercave.com/wp/76Mk7za.jpg', description: 'Nutty almond flavor blended into smooth ice cream.' },
  { name: 'Berry Bliss', price: 109, uri: 'https://th.bing.com/th/id/OIP.u2dIKp1o5QgQmwDM5PAsagHaFj', description: 'A burst of mixed berry freshness in every scoop.' },
];

const cakeImages = [
  { name: 'Chocolate Truffle', price: 149, uri: 'https://th.bing.com/th/id/OIP.1bZNspfoseb75Q-gL8tkZAHaJ4', description: 'Decadent chocolate cake with rich truffle layers.' },
  { name: 'Red Velvet', price: 159, uri: 'https://th.bing.com/th/id/OIP.uNQZfoh-kjfvsQ_Pn7Ba2QHaJQ', description: 'Soft and velvety red cake with cream cheese frosting.' },
  { name: 'Black Forest', price: 139, uri: 'https://th.bing.com/th/id/OIP.0z0nrtekvi2G50aazW3HkAHaKy', description: 'German classic with chocolate, cherries, and cream.' },
  { name: 'Cheesecake', price: 169, uri: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', description: 'Smooth and creamy baked cheesecake.' },
  { name: 'Pineapple Cake', price: 129, uri: 'https://th.bing.com/th/id/OIP.eAvCvXlneVwBd5A5VeHYDQHaLG', description: 'Fluffy cake topped with tangy pineapple.' },
  { name: 'Mango Cake', price: 139, uri: 'https://natashaskitchen.com/wp-content/uploads/2017/05/Mango-Cake-Recipe-3.jpg', description: 'Fresh mango layers in a soft sponge cake.' },
  { name: 'Mixed Berry Cake', price: 159, uri: 'https://th.bing.com/th/id/OIP.BIF_S_FA3hA8Ljg5HNsJywHaLH', description: 'Berry-loaded cake with a tangy twist.' },
];

const pastryImages = [
  { name: 'Chocolate Eclair', price: 69, uri: 'https://www.unileverfoodsolutions.com.au/dam/global-ufs/mcos/ANZ/calcmenu/recipes/AU-recipes/desserts-&-bakery/chocolate-eclairs/main-header.jpg', description: 'Choux pastry filled with cream and chocolate glaze.' },
  { name: 'Fruit Danish', price: 59, uri: 'https://th.bing.com/th/id/OIP.g0pVE5l6Ro9csV0X4ZSfTQHaE8', description: 'Crispy danish filled with sweet fruit toppings.' },
  { name: 'Strawberry Tart', price: 79, uri: 'https://aseasyasapplepie.com/wp-content/uploads/2015/03/strawberry-tart-with-pastry-cream.jpg', description: 'Tart base filled with cream and topped with strawberries.' },
  { name: 'Almond Croissant', price: 89, uri: 'https://th.bing.com/th/id/OIP.fO9FfAVhNMg1sSmZLdpwkAHaHa', description: 'Flaky croissant filled with almond paste.' },
  { name: 'Chocolate Puff', price: 75, uri: 'https://www.sugarsaltmagic.com/wp-content/uploads/2024/02/Chocolate-Puff-Pastries-16FEAT-500x500.jpg', description: 'Crispy puff pastry with gooey chocolate center.' },
];

const cheesecakeImages = [
  { name: 'Classic New York', price: 189, uri: 'https://i.pinimg.com/originals/0c/09/af/0c09afd6ef2745b1515088546d58d502.jpg', description: 'Smooth baked cheesecake with rich creaminess.' },
  { name: 'Blueberry Cheesecake', price: 199, uri: 'https://www.lifeloveandsugar.com/wp-content/uploads/2021/03/Blueberry-Cheesecake4.jpg', description: 'Tangy blueberries meet creamy cheesecake.' },
  { name: 'Strawberry Cheesecake', price: 189, uri: 'https://th.bing.com/th/id/OIP.nhDnvhl26oAXZypz5S1NnQHaLH', description: 'Sweet strawberries on top of soft cheesecake.' },
  { name: 'Chocolate Cheesecake', price: 209, uri: 'https://www.shugarysweets.com/wp-content/uploads/2020/02/no-bake-chocolate-cheesecake-6.jpg', description: 'Decadent cheesecake with rich chocolate flavor.' },
  { name: 'Oreo Cheesecake', price: 199, uri: 'https://th.bing.com/th/id/OIP.M9Ebocoy7rIRRLbKX8jSWwHaLH', description: 'Oreo lovers’ dream with cookie crust and cream.' },
];

const cookieImages = [
  { name: 'Chocolate Chip', price: 49, uri: 'https://th.bing.com/th/id/OIP.DvtMOyIlvS9WIwvBA_EI2AHaHa', description: 'Classic cookie with gooey chocolate chips.' },
  { name: 'Oatmeal Raisin', price: 45, uri: 'https://healthyfitnessmeals.com/wp-content/uploads/2021/06/Healthy-oatmeal-raisin-cookies-9.jpg', description: 'Healthy oats with sweet chewy raisins.' },
  { name: 'Peanut Butter', price: 55, uri: 'https://th.bing.com/th/id/OIP.FekT_jXvjmHDdh1E0akn6wAAAA', description: 'Buttery cookie with nutty richness.' },
  { name: 'Double Chocolate', price: 59, uri: 'https://celebratingsweets.com/wp-content/uploads/2021/05/Double-Chocolate-Chip-Cookies-1-5.webp', description: 'Twice the chocolate, twice the fun.' },
  { name: 'Butter Cookies', price: 40, uri: 'https://www.cookingclassy.com/wp-content/uploads/2018/12/butter-cookies-5.jpg', description: 'Melt-in-mouth buttery goodness.' },
];

// (continue using your existing App code from here onward...)


export default function App() {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('icecream');

  const allItems = { icecream: iceCreamImages, cake: cakeImages, pastry: pastryImages, cheesecake: cheesecakeImages, cookies: cookieImages };
  const items = allItems[category] || [];
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

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
    setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));
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
          <Text style={styles.title}>👋 Welcome Back!</Text>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }} style={{ width: 100, height: 100, marginVertical: 20 }} />
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
          <Text style={styles.greeting}>Hello, {email.split('@')[0]}!</Text>
          <Text style={styles.title}>🍰 Welcome to Farhana's Dessert World</Text>
          <Image source={{ uri: 'https://th.bing.com/th/id/OIP.otxSLbzSTxdQqfklBJpENwHaEK' }} style={{ width: 250, height: 200, borderRadius: 10, marginBottom: 20 }} />
          <Pressable style={styles.button} onPress={() => setScreen('home')}>
            <Text style={styles.buttonText}>🍨 Explore Desserts</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: '#6c757d' }]} onPress={() => setScreen('login')}>
            <Text style={styles.buttonText}>🔙 Logout</Text>
          </Pressable>
        </>
      )}

      {/* HOME PAGE */}
      {screen === 'home' && (
        <>
          <Text style={styles.title}>🍬 Pick Your Favorites</Text>
          <View style={styles.categorySwitch}>
            {Object.keys(allItems).map(cat => (
              <Pressable key={cat} style={[styles.categoryBtn, category === cat && styles.activeTab]} onPress={() => setCategory(cat)}>
                <Text style={styles.tabText}>
                  {{
                    icecream: 'Ice Creams',
                    cake: 'Cakes',
                    pastry: 'Pastries',
                    cheesecake: 'Cheesecakes',
                    cookies: 'Cookies',
                  }[cat]}
                </Text>
              </Pressable>
            ))}
          </View>
          <TextInput placeholder="Search desserts..." value={search} onChangeText={setSearch} style={styles.input} />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredItems.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
                <Pressable style={styles.button} onPress={() => addToCart(item)}>
                  <Text style={styles.buttonText}>Add to Cart 🛒</Text>
                </Pressable>
              </View>
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
          <Text style={styles.title}>🛒 Your Cart</Text>
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

// Styles (unchanged)
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
