const convertServiceError = (err) => Promise.reject(err);

const convertNetworkError = (err) => {
  return {
    code: 'NETWORK-ERROR',
    err
  };
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogin = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .catch(convertNetworkError)
    .then(response => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then(response => { return response.ok; });
};

export const postProductToCart = ({ username, product }) => {
  return fetch(`/basket/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ product }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(convertServiceError);
    });
};

export const updateProductQty = ({ username, productId, product }) => {
  return fetch(`/basket/${username}/${productId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ product }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const updateProduct = ({ productId, product }) => {
  return fetch(`/products/${productId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ product }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const deleteProduct = ({ productId }) => {
  return fetch(`/products/${productId}`, {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then(response => { return response.json(); });
}

export const fetchCart = (username) => {
  return fetch(`/basket/${username}`, {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchProducts = () => {
  return fetch('/products', {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const postProduct = ({ name, brand, type, concern, howToUse, ingredients, price, maxQuantity }) => {
  return fetch('/products', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ name, brand, type, concern, howToUse, ingredients, price, maxQuantity }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(convertServiceError);
    });
};


export const sendOrder = (input) => {
  const username = input.username;
  const productsOrdered = input.orderProducts;
  return fetch(`/orders/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ productsOrdered }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(convertServiceError);
    });
};

export const removeProductFromCart = ({ username, productId }) => {
  return fetch(`/basket/${username}/${productId}`, {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then(response => { return response.json(); });
}

export const sendReview = ({ username, rating, comment }) => {
  return fetch(`/feedback/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ rating, comment }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return response.json().then(convertServiceError);
    });
};

export const fetchOrder = ({ username }) => {
  return fetch(`/orders/${username}`, {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const cancelOrder = ({ username, orderId }) => {
  return fetch(`/orders/${username}/${orderId}`, {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};

export const fetchWishList = ({ username }) => {
  return fetch(`/wishList/${username}`, {
    method: 'GET',
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(convertServiceError);
      }
      return response.json();
    });
};


export const addProductToWishList = (input) => {
  const username = input.username;
  const product = input.product;
  return fetch(`/wishList/${username}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ product }),
  })
    .catch(convertNetworkError)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(convertServiceError);
    });
};

export const removeProductFromWishList = ({ username, productId }) => {
  return fetch(`/wishList/${username}/${productId}`, {
    method: 'DELETE',
  })
    .catch(convertNetworkError)
    .then(response => { return response.json(); });
}