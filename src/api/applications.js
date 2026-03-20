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
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  const parsed = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(parsed.message || `POST /applications failed: ${res.status}`);
  }

  return parsed;
}

export async function updateApplication(id, status, reviewedBy) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, reviewedBy }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`PATCH /applications/${id} failed: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : {};
}

export async function getMyApplications(userSub) {
  const res = await fetch(`${API_URL}/applications`);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET /applications failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.filter((app) => app.submittedBy === userSub);
}