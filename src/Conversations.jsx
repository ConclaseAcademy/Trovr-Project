import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const BACKEND_BASE_URL = "http://104.211.22.120:5000";

function Conversations({ currentUserId }) {
  const [inbox, setInbox] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeListing, setActiveListing] = useState(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    axios.get(`${BACKEND_BASE_URL}/api/conversations/inbox`)
      .then((response) => {
        setInbox(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeConversationId]);

  useEffect(() => {
    if (!activeConversationId) return;

    axios.get(`${BACKEND_BASE_URL}/conversations/${activeConversationId}/messages`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeConversationId]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectConversation = (item) => {
    setActiveConversationId(item._id || item.id);
    setActiveListing(item.listing); 
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const payload = {
      text: newMessage.trim()
    };

    axios.post(`${BACKEND_BASE_URL}/conversations/${activeConversationId}/messages`, payload)
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {!activeConversationId ? (
          <div>
            <div style={styles.top}>
              <h3 style={styles.title}>Messages</h3>
            </div>
            <div style={styles.listContainer}>
              {inbox.map((item) => (
                <div 
                  key={item._id || item.id} 
                  onClick={() => handleSelectConversation(item)}
                  style={styles.inboxItem}
                >
                  <div style={styles.avatar}></div>
                  <div style={styles.inboxDetails}>
                    <div style={styles.sellerName}>{item.recipientName || "Seller"}</div>
                    <div style={styles.itemSubtext}>{item.listingTitle || "Product Listing"}</div>
                    <div style={styles.lastMessage}>{item.lastMessage?.text || "Click to view chat"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.chatViewContainer}>
            <div style={styles.top}>
              <div style={styles.sellerHeader}>
                <button onClick={() => setActiveConversationId(null)} style={styles.backBtn}>←</button>
                <div style={styles.avatar}></div>
                <div>
                  <div style={styles.sellerName}>{activeListing?.sellerName || "Wealth Happiness"}</div>
                  <div style={styles.itemSubtext}>Seller • {activeListing?.title || "Organic Chemistry Textbook"}</div>
                </div>
              </div>
              
              <div style={styles.productCard}>
                <img 
                  src={activeListing?.image || "https://via.placeholder.com/60"} 
                  alt="product" 
                  style={styles.productImg} 
                />
                <div style={styles.productDetails}>
                  <div style={styles.productTitle}>{activeListing?.title || "Organic Chemistry Textbook - 2nd Edition"}</div>
                  <div style={styles.productPrice}>₦{activeListing?.price || "5,000"}</div>
                  <div style={styles.productLocation}>📍 {activeListing?.location || "Alaba Market, Ojo, Lagos"}</div>
                </div>
              </div>
            </div>

            <div ref={chatWindowRef} style={styles.chatWindow}>
              {messages.map((msg) => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg._id || msg.id} style={{ ...styles.messageRow, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      ...styles.bubble, 
                      backgroundColor: isMe ? '#001a72' : '#0033cc', 
                      color: '#fff',
                      borderRadius: isMe ? '12px 12px 0px 12px' : '12px 12px 12px 0px'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} style={styles.fieldGroup}>
              <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message..." 
                style={styles.inputField}
              />
              <button type="submit" style={styles.sendBtn}>
                ➤
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f1f1f1'
  },
  card: {
    width: '100%',
    maxWidth: '375px',
    height: '600px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  top: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff'
  },
  title: {
    margin: 0,
    fontSize: '18px',
    color: '#333'
  },
  listContainer: {
    height: '530px',
    overflowY: 'auto'
  },
  inboxItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer',
    gap: '12px'
  },
  inboxDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  lastMessage: {
    fontSize: '12px',
    color: '#888',
    marginTop: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '220px'
  },
  chatViewContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  sellerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0 4px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#f4c430',
    flexShrink: 0
  },
  sellerName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333'
  },
  itemSubtext: {
    fontSize: '11px',
    color: '#777'
  },
  productCard: {
    display: 'flex',
    gap: '12px',
    padding: '8px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: '#fafafa'
  },
  productImg: {
    width: '55px',
    height: '55px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  productTitle: {
    fontSize: '12px',
    color: '#333'
  },
  productPrice: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#000',
    margin: '2px 0'
  },
  productLocation: {
    fontSize: '10px',
    color: '#666'
  },
  chatWindow: {
    height: '320px',
    overflowY: 'auto',
    padding: '15px',
    backgroundColor: '#f7f9fc',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  messageRow: {
    display: 'flex',
    width: '100%'
  },
  bubble: {
    maxWidth: '80%',
    padding: '10px 14px',
    fontSize: '13px',
    lineHeight: '1.4',
    wordBreak: 'break-word'
  },
  fieldGroup: {
    display: 'flex',
    padding: '12px',
    backgroundColor: '#fff',
    borderTop: '1px solid #eee',
    gap: '8px',
    alignItems: 'center',
    marginTop: 'auto'
  },
  inputField: {
    flexGrow: 1,
    padding: '10px 14px',
    borderRadius: '24px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    fontSize: '13px'
  },
  sendBtn: {
    backgroundColor: '#d4af37',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Conversations;