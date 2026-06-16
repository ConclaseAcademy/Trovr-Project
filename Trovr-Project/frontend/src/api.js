const BASE_URL = "http://localhost:5000/api";


const getToken = () => localStorage.getItem("token");



export async function getListings() {
  const response = await fetch(`${BASE_URL}/listings`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }

  const data = await response.json();
  return data;
}



export async function createListing(listingData) {
  const response = await fetch(`${BASE_URL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    throw new Error("Failed to create listing");
  }

  const data = await response.json();
  return data;
}



export async function getMyListings() {
  const response = await fetch(`${BASE_URL}/listings/my`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your listings");
  }

  const data = await response.json();
  return data;
}