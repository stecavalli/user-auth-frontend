export function register(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return { success: false, message: "Nome utente già esistente." };
  }

  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true };
}

export function login(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return { success: true };
  }

  return { success: false, message: "Credenziali non valide." };
}

export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

export function logout() {
  localStorage.removeItem("loggedInUser");
}
