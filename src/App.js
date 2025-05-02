import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/product/:id/" element={<ProductScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/cart/:id?" element={<CartScreen/>}/>
            <Route path="/shipping" element={<ShippingScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/payment" element={<PaymentScreen/>}/>
            <Route path="/order/:orderId" element={<OrderScreen/>}/>
            <Route path="/admin/usersList/" element={<UserListScreen/>}/>
            <Route path="/admin/user/:id/edit/" element={<UserEditScreen/>}/>
            <Route path="/admin/productsList/" element={<ProductListScreen/>}/>
            <Route path="/admin/product/:productId/edit/" element={<ProductEditScreen/>}/>
            <Route path="admin/ordersList/" element={<OrderListScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
