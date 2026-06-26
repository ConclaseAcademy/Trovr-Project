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
  axios.get(`${API_URL}/listings/${listingId}`);

export const updateListing = (listingId, listingData) =>
  axios.patch(`${API_URL}/listings/${listingId}`, listingData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getMyListings = () =>
  axios.get(`${API_URL}/listings/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

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