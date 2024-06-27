import axios from "axios";

const API_KEY = "AIzaSyCdkeM8OJjZzIq7mxoBAAinT0isqhsb1mo";
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY], Login endpoint

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

//no need for the await here bc the function will yeild the token

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password);
}

//data from axios login response:
// Property                   Type
// idToken	                 string
// email	                 string
// refreshToken	             string
// expiresIn	             string
// localId	                 string
// registered	             boolean
