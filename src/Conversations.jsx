import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_BASE_URL = "http://104.211.22.120:5000";

const inputStyle = {
  flexGrow: 1,
  padding: '10px 14px',
  borderRadius: '24px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#f9f9f9',
  outline: 'none',
  fontSize: '13px',
  fontFamily: 'Poppins, sans-serif'
};

const avatarStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#f4c430',
  flexShrink: 0
};

const topHeaderStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff'
};

function Conversations({ currentUserId }) {
  const navigate = useNavigate();
  const chatWindowRef = useRef(null);

  const [inbox, setInbox] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeListing, setActiveListing] = useState(null);
  
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (!toast.isActive("login-warning")) {
        toast.error("You need to login to view your conversations.", {
          toastId: "login-warning",
        });
      }
      setTimeout(() => {
        navigate("/login");
      }, 100);
      return;
    }
    setIsCheckingAuth(false);
  }, [navigate]);

  useEffect(() => {
    if (isCheckingAuth) return;

    const fetchInbox = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/conversations/inbox`);
        setInbox(response.data);
      } catch (error) {
        console.error("Error fetching inbox data:", error.message);
      }
    };

    fetchInbox();
  }, [activeConversationId, isCheckingAuth]);

  useEffect(() => {
    if (!activeConversationId || isCheckingAuth) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/conversations/${activeConversationId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error.message);
      }
    };

    fetchMessages();
  }, [activeConversationId, isCheckingAuth]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectConversation = (item) => {
    setActiveConversationId(item._id || item.id);
    setActiveListing(item.listing); 
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const payload = { text: newMessage.trim() };

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/conversations/${activeConversationId}/messages`, payload);
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error.message);
      toast.error("Failed to deliver message. Try again later.");
    }
  };

  if (isCheckingAuth) return null;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {!activeConversationId ? (
          <div>
            <div style={topHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#333', fontWeight: '700' }}>Messages</h3>
            </div>
            <div style={styles.listContainer}>
              {inbox.map((item) => (
                <InboxItem 
                  key={item._id || item.id} 
                  item={item} 
                  onSelect={handleSelectConversation} 
                />
              ))}
            </div>
          </div>
        ) : (
      
          <div style={styles.chatViewContainer}>
            <div style={topHeaderStyle}>
              <div style={styles.sellerHeader}>
                <button onClick={() => setActiveConversationId(null)} style={styles.backBtn}>←</button>
                <div style={avatarStyle}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{activeListing?.sellerName || "Wealth Happiness"}</div>
                  <div style={{ fontSize: '11px', color: '#777' }}>Seller • {activeListing?.title || "Organic Chemistry Textbook"}</div>
                </div>
              </div>
              
              <ProductCard listing={activeListing} />
            </div>

            <div ref={chatWindowRef} style={styles.chatWindow}>
              {messages.map((msg) => (
                <MessageBubble 
                  key={msg._id || msg.id} 
                  msg={msg} 
                  currentUserId={currentUserId} 
                />
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={styles.fieldGroup}>
              <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message..." 
                style={inputStyle}
              />
              <button type="submit" style={styles.sendBtn}>➤</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

const InboxItem = ({ item, onSelect }) => (
  <div onClick={() => onSelect(item)} style={styles.inboxItem}>
    <div style={avatarStyle}></div>
    <div style={styles.inboxDetails}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{item.recipientName || "Seller"}</div>
      <div style={{ fontSize: '11px', color: '#777' }}>{item.listingTitle || "Product Listing"}</div>
      <div style={styles.lastMessage}>{item.lastMessage?.text || "Click to view chat"}</div>
    </div>
  </div>
);

const ProductCard = ({ listing }) => (
  <div style={styles.productCard}>
    <img 
      src={listing?.image || "https://via.placeholder.com/60"} 
      alt="product" 
      style={styles.productImg} 
    />
    <div style={styles.productDetails}>
      <div style={{ fontSize: '12px', color: '#333', fontWeight: '500' }}>{listing?.title || "Organic Chemistry Textbook - 2nd Edition"}</div>
      <div style={styles.productPrice}>₦{listing?.price || "5,000"}</div>
      <div style={styles.productLocation}>📍 {listing?.location || "Alaba Market, Ojo, Lagos"}</div>
    </div>
  </div>
);

const MessageBubble = ({ msg, currentUserId }) => {
  const isMe = msg.senderId === currentUserId;
  return (
    <div style={{ ...styles.messageRow, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      <div style={{ 
        ...styles.bubble, 
        backgroundColor: isMe ? '#800020' : '#F5F5F5', 
        color: isMe ? '#fff' : '#333',
        borderRadius: isMe ? '12px 12px 0px 12px' : '12px 12px 12px 0px'
      }}>
        {msg.text}
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', backgroundColor: '#f1f1f1', fontFamily: 'Poppins, sans-serif' },
  card: { width: '100%', maxWidth: '375px', height: '600px', borderRadius: '16px', backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  listContainer: { height: '530px', overflowY: 'auto' },
  inboxItem: { display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer', gap: '12px' },
  inboxDetails: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
  lastMessage: { fontSize: '12px', color: '#888', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '220px' },
  chatViewContainer: { display: 'flex', flexDirection: 'column', height: '100%' },
  sellerHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  backBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '0 4px' },
  productCard: { display: 'flex', gap: '12px', padding: '8px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' },
  productImg: { width: '55px', height: '55px', objectFit: 'cover', borderRadius: '6px' },
  productDetails: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  productPrice: { fontSize: '13px', fontWeight: 'bold', color: '#000', margin: '2px 0' },
  productLocation: { fontSize: '10px', color: '#666' },
  chatWindow: { height: '320px', overflowY: 'auto', padding: '15px', backgroundColor: '#f7f9fc', display: 'flex', flexDirection: 'column', gap: '12px' },
  messageRow: { display: 'flex', width: '100%' },
  bubble: { maxWidth: '80%', padding: '10px 14px', fontSize: '13px', lineHeight: '1.4', wordBreak: 'break-word', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  fieldGroup: { display: 'flex', padding: '12px', backgroundColor: '#fff', borderTop: '1px solid #eee', gap: '8px', alignItems: 'center', marginTop: 'auto' },
  sendBtn: { backgroundColor: '#800020', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '14px' }
};

export default Conversations;