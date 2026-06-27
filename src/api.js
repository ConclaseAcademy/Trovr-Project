import axios from "axios";

const API_URL = "http://104.211.22.120:5000/api";


export const getListings = () => axios.get(`${API_URL}/listings`);

export const createListing = (listingData) =>
  axios.post(`${API_URL}/listings`, listingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getListingDetails = (listingId) =>
  axios.get(`${API_URL}/listings/${listingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateListing = (listingId, listingData) =>
  axios.patch(`${API_URL}/listings/${listingId}`, listingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getMyListings = () => {
const token = localStorage.getItem('token');
 return axios.get(`${API_URL}/listings/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  });
};
export const replaceListingImages = (listingId, imageData) =>
  axios.patch(`${API_URL}/listings/${listingId}/images`, imageData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const deleteListingImage = (listingId, imageId) =>
  axios.delete(`${API_URL}/listings/${listingId}/images/${imageId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const markAsSold = (listingId) =>
  axios.patch(`${API_URL}/listings/${listingId}/sold`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  export const relistListing = (listingId) =>
  axios.patch(`${API_URL}/listings/${listingId}/relist`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const forgotPassword = (email) =>
  axios.post(`${API_URL}/auth/forgot-password`, { email });

export const resetPassword = (token, password) =>
  axios.post(`${API_URL}/auth/reset-password`, { token, password });

export const verifyEmail = (token) =>
  axios.get(`${API_URL}/auth/verify-email?token=${token}`);

export const startConversation = (data) =>
  axios.post(`${API_URL}/conversations/start`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const sendMessage = (conversationId, data) =>
  axios.post(`${API_URL}/conversations/${conversationId}/messages`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getMessages = (conversationId) =>
  axios.get(`${API_URL}/conversations/${conversationId}/messages`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getInbox = () =>
  axios.get(`${API_URL}/conversations/inbox`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getUnreadCount = () =>
  axios.get(`${API_URL}/conversations/unread-count`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });