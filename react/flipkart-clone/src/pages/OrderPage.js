import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import MainLayout from '../components/templates/MainLayout';
import Icon from '../components/atoms/Icon';
import { ArrowBack, CheckCircle, LocalShipping, CreditCard } from '@mui/icons-material';
import styles from './OrderPage.module.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, cartTotal, cartSavings, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryAddress] = useState({
    name: 'Kunik Jain',
    mobile: '+91 9876543210',
    address: '123 Main Street, Sector 1',
    city: 'Dungarpur',
    state: 'Rajasthan',
    pincode: '314001'
  });

  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const finalAmount = cartTotal + deliveryCharge;

  const handlePlaceOrder = () => {
    const orderId = 'OD' + Date.now();
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);

    const newOrderDetails = {
      orderId,
      items: [...cartItems],
      totalAmount: finalAmount,
      paymentMethod,
      deliveryAddress: { ...deliveryAddress },
      orderDate: new Date(),
      estimatedDelivery,
      status: 'confirmed'
    };

    setOrderDetails(newOrderDetails);
    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const handleTrackOrder = () => {
    navigate('/');
  };

  if (orderPlaced && orderDetails) {
    return (
      <MainLayout>
        <div className={styles.orderContainer}>
          <div className={styles.successSection}>
            <div className={styles.successIcon}>
              <Icon icon={<CheckCircle />} size="large" color="#388e3c" />
            </div>
            <h1 className={styles.successTitle}>Order Placed Successfully!</h1>
            <p className={styles.successSubtitle}>
              Thank you for shopping with Flipkart
            </p>

            <div className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>Order Details</h3>
                <span className={styles.orderId}>Order ID: {orderDetails.orderId}</span>
              </div>

              <div className={styles.orderInfo}>
                <div className={styles.infoRow}>
                  <span>Order Date:</span>
                  <span>{orderDetails.orderDate.toLocaleDateString()}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Total Amount:</span>
                  <span className={styles.amount}>₹{Math.floor(orderDetails.totalAmount * 80).toLocaleString()}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Payment Method:</span>
                  <span>{orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Estimated Delivery:</span>
                  <span className={styles.deliveryDate}>
                    {orderDetails.estimatedDelivery.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className={styles.deliverySection}>
                <div className={styles.deliveryIcon}>
                  <Icon icon={<LocalShipping />} size="medium" color="#2874f0" />
                </div>
                <div className={styles.deliveryText}>
                  <p>Your order will be delivered to:</p>
                  <div className={styles.address}>
                    <strong>{orderDetails.deliveryAddress.name}</strong><br />
                    {orderDetails.deliveryAddress.address}<br />
                    {orderDetails.deliveryAddress.city}, {orderDetails.deliveryAddress.state} - {orderDetails.deliveryAddress.pincode}<br />
                    Mobile: {orderDetails.deliveryAddress.mobile}
                  </div>
                </div>
              </div>

              <div className={styles.orderItems}>
                <h4>Ordered Items ({orderDetails.items.length})</h4>
                {orderDetails.items.map((item) => (
                  <div key={item.cartId} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.itemDetails}>
                      <h5>{item.title}</h5>
                      <p>Qty: {item.quantity}</p>
                      <p className={styles.itemPrice}>₹{Math.floor(item.price * 80 * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.actionButtons}>
                <button 
                  className={styles.continueBtn}
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
                <button 
                  className={styles.trackBtn}
                  onClick={handleTrackOrder}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.orderContainer}>
        <div className={styles.orderHeader}>
          <div className={styles.backButton} onClick={() => navigate('/cart')}>
            <Icon icon={<ArrowBack />} size="medium" />
            <span>Back to Cart</span>
          </div>
          <h1>Place Order</h1>
        </div>

        <div className={styles.orderContent}>
          <div className={styles.orderSummary}>
            <div className={styles.summaryCard}>
              <h3>Order Summary ({cartItems.length} items)</h3>
              <div className={styles.orderItems}>
                {cartItems.map((item) => (
                  <div key={item.cartId} className={styles.summaryItem}>
                    <div className={styles.itemImage}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.itemInfo}>
                      <h4>{item.title}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p className={styles.itemPrice}>₹{Math.floor(item.price * 80 * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{Math.floor((cartTotal + cartSavings) * 80).toLocaleString()}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Discount</span>
                  <span className={styles.savings}>−₹{Math.floor(cartSavings * 80).toLocaleString()}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? styles.free : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.priceRow + ' ' + styles.totalAmount}>
                  <span>Total Amount</span>
                  <span>₹{Math.floor(finalAmount * 80).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className={styles.addressCard}>
              <h3>Delivery Address</h3>
              <div className={styles.addressInfo}>
                <div className={styles.addressDetails}>
                  <strong>{deliveryAddress.name}</strong><br />
                  {deliveryAddress.address}<br />
                  {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}<br />
                  Mobile: {deliveryAddress.mobile}
                </div>
                <button className={styles.changeAddressBtn}>
                  Change Address
                </button>
              </div>
            </div>

            <div className={styles.paymentCard}>
              <h3>Payment Method</h3>
              <div className={styles.paymentOptions}>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentInfo}>
                    <Icon icon={<LocalShipping />} size="small" />
                    <span>Cash on Delivery</span>
                  </div>
                </label>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className={styles.paymentInfo}>
                    <Icon icon={<CreditCard />} size="small" />
                    <span>Online Payment (UPI/Card/Wallet)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.orderAction}>
            <div className={styles.actionCard}>
              <div className={styles.finalAmount}>
                <span>Total: ₹{Math.floor(finalAmount * 80).toLocaleString()}</span>
              </div>
              <button 
                className={styles.placeOrderBtn}
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              >
                Place Order
              </button>
              <p className={styles.orderNote}>
                By placing your order, you agree to Flipkart's Terms of Use and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderPage;
