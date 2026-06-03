const API_BASE_URL = "http://localhost:5000";

export async function searchFaq(keyword) {
  const response = await fetch(`${API_BASE_URL}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keyword })
  });

  if (!response.ok) {
    throw new Error("FAQ search failed");
  }

  return response.json();
}

export async function submitUserQuery(question) {
  const response = await fetch(`${API_BASE_URL}/api/queries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  if (!response.ok) {
    throw new Error("Query submission failed");
  }

  return response.json();
}
