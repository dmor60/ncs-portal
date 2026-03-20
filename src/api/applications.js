const API_URL = "https://ip762g5pwl.execute-api.us-east-1.amazonaws.com";

export async function getApplications() {
  const res = await fetch(`${API_URL}/applications`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET /applications failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function createApplication(data) {
  console.log("POSTing to:", `${API_URL}/applications`);
  console.log("Payload:", data);

  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log("POST response status:", res.status);
  console.log("POST response text:", text);

  if (!res.ok) {
    throw new Error(`POST /applications failed: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : {};
}

export async function updateApplication(id, status) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`PATCH /applications/${id} failed: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : {};
}