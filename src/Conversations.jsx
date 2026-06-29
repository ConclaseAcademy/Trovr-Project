import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInbox, getMessages, sendMessage } from './api';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';
import useStore from './store';

function Conversations() {
  const navigate = useNavigate();
  const { user } = useStore();
  const chatWindowRef = useRef(null);
  const [inbox, setInbox] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login to view conversations.");
      navigate("/login");
      return;
    }
    getInbox()
      .then((response) => {
        setInbox(response.data.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.message || "Failed to load inbox";
        toast.error(errorMsg);
      });
  }, []);

  useEffect(() => {
    if (!activeConversation) return;
    getMessages(activeConversation.id)
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.message || "Failed to load messages";
        toast.error(errorMsg);
      });
  }, [activeConversation]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(activeConversation.id, { body: newMessage.trim() })
      .then((response) => {
        setMessages([...messages, response.data.data]);
        setNewMessage('');
      })
      .catch(() => toast.error("Failed to send message"));
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Poppins, sans-serif", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, maxWidth: "800px", margin: "0 auto", padding: "32px 16px", width: "100%", boxSizing: "border-box" }}>

        {!activeConversation ? (
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1e3a8a", marginBottom: "24px" }}>Messages</h2>
            {inbox.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>💬</div>
                <p style={{ fontSize: "16px", fontWeight: "600", color: "#555" }}>No conversations yet</p>
                <p style={{ fontSize: "13px", color: "#999" }}>Message a seller from the browse page to get started</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {inbox.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveConversation(item)}
                    style={{ backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  >
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#1e3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px", flexShrink: 0 }}>
                      {item.otherUser?.name?.[0]?.toUpperCase() || "S"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>{item.otherUser?.name || "Seller"}</p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{item.listing?.title || "Listing"}</p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#888", marginTop: "4px" }}>{item.lastMessage?.body || "Click to view chat"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", height: "600px" }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => { setActiveConversation(null); setMessages([]); }}
                style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#333" }}
              >←</button>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#1e3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                {activeConversation.otherUser?.name?.[0]?.toUpperCase() || "S"}
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: "#333" }}>{activeConversation.otherUser?.name || "Seller"}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>{activeConversation.listing?.title || "Listing"}</p>
              </div>
            </div>

            <div ref={chatWindowRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#f7f9fc" }}>
              {messages.length === 0 ? (
                <p style={{ textAlign: "center", color: "#999", fontSize: "13px", marginTop: "40px" }}>No messages yet. Say hello!</p>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: isMe ? "12px 12px 0 12px" : "12px 12px 12px 0", backgroundColor: isMe ? "#1e3a8a" : "#fff", color: isMe ? "#fff" : "#333", fontSize: "13px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                        {msg.body}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ padding: "12px", borderTop: "1px solid #eee", display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
                placeholder="Type a message..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: "24px", border: "1px solid #e0e0e0", fontSize: "13px", outline: "none", fontFamily: "Poppins, sans-serif" }}
              />
              <button
                onClick={handleSendMessage}
                style={{ backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", fontSize: "16px" }}
              >➤</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Conversations;