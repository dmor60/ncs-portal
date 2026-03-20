const API_URL = "https://ip762g5pwl.execute-api.us-east-1.amazonaws.com";

export async function getApplications() {
  const res = await fetch(`${API_URL}/applications`);
  return res.json();
}

export async function createApplication(data) {
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateApplication(id, status) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}