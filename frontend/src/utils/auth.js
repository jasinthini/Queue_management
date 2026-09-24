export function getToken() {
  return localStorage.getItem("queue_token");
}

export function getUser() {
  try {
    const user = localStorage.getItem("queue_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function clearAuth() {
  localStorage.removeItem("queue_token");
  localStorage.removeItem("queue_user");
}