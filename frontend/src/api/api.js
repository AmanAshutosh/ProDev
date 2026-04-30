const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const req = async (endpoint, opts = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("prodev-token") : null;
  const res = await fetch(`${BASE}${endpoint}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...opts.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

const reqForm = async (endpoint, formData) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("prodev-token") : null;
  const res = await fetch(`${BASE}${endpoint}`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Request failed");
  }
  return res;
};

export const api = {
  get: (ep) => req(ep),
  post: (ep, body) => req(ep, { method: "POST", body: JSON.stringify(body) }),
  put: (ep, body) => req(ep, { method: "PUT", body: JSON.stringify(body) }),
  del: (ep) => req(ep, { method: "DELETE" }),
  postForm: (ep, formData) => reqForm(ep, formData),
};
