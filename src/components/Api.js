class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // USER ROUTES

  // Get current user's info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Update profile info (name and about)
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  // Update avatar
  updateAvatar(avatarUrl) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(this._checkResponse);
}


  // CARD ROUTES

  // Get all cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Add a new card
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  // Delete a card
  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "a2a2c423-7cb0-4ced-94a4-b5c16324eb7c",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete card");
        }
        return response.json();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
        throw err;
      });
  }
  likeCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  // Add this method to the Api class
  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserProfile(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "a2a2c423-7cb0-4ced-94a4-b5c16324eb7c", // Replace with dynamic token if needed
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  }
}

// Export the API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a2a2c423-7cb0-4ced-94a4-b5c16324eb7c",
    "Content-Type": "application/json",
  },
});

export default api;

// Generic GET request function
function get(endpoint) {
  return fetch(`${config.baseUrl}/${endpoint}`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

// Export your functions here
export { get };
