import React, { useState, useEffect } from 'react'
  import { CssBaseline } from '@material-ui/core'
  import { commerce } from './lib/commerce'
  import Products from './components/Products/Products'
  import Navbar from './components/Navbar/Navbar'
  import Cart from './components/Cart/Cart'
  import Checkout from './components/CheckoutForm/Chechout/Checkout'
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
  import { loadStripe } from '@stripe/stripe-js'

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);


    return (
               
      <Router>
        <div style={{ display: 'flex' }}>
        <CssBaseline />
          < Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle}/>
          <Routes>
            <Route exact path="/" element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
            ></Route>
            <Route exact path="/cart" element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
             />}
            ></Route>
            <Route exact path="/checkout" element={
              <Checkout checkout={Checkout}
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                stripe={stripePromise}
             
                                        />}
           ></Route>
          </Routes>
               </div>
      </Router>
    )
};

  export default App