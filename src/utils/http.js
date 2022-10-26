export const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = (url, id, itemObj) => {
  return fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  });
};

export const deleteData = (url, id) => {
  return fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
};
