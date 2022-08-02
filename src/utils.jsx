export async function myFetch(url, method = 'GET', data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
    };
    options.method = method;
    options.body = data ? JSON.stringify(data) : null;
    // console.log('options ===', options);
    const response = await fetch(url, options);
    // console.log('response ===', response);
    const dataInJs = await response.json();
    return { data: dataInJs, status: response.status };
  } catch (error) {
    console.log('myFetch error ===', error);
  }
}
export async function myFetchPostAuth(url, token, data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };
    options.method = 'POST';
    options.body = data ? JSON.stringify(data) : null;
    // console.log('options ===', options);
    const response = await fetch(url, options);
    // console.log('response ===', response);
    const dataInJs = await response.json();
    return { data: dataInJs, status: response.status };
  } catch (error) {
    console.log('myFetchPostAuth error ===', error);
  }
}

export async function myFetchDeleteAuth(url, token) {
  try {
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    options.method = 'DELETE';
    // console.log('options ===', options);
    const response = await fetch(url, options);
    // console.log('response ===', response);
    const dataInJs = await response.json();
    return { data: dataInJs, status: response.status };
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}

export async function myFetchPatchAuth(url, token, data = null) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };
    options.method = 'PATCH';
    options.body = data ? JSON.stringify(data) : null;
    // console.log('options ===', options);
    const response = await fetch(url, options);
    // console.log('response ===', response);
    const dataInJs = await response.json();
    return { data: dataInJs, status: response.status };
  } catch (error) {
    console.log('myFetchPatchAuth error ===', error);
  }
}

export async function myFetchAuth(url, token) {
  try {
    const options = {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    };

    // console.log('options ===', options);
    const response = await fetch(url, options);
    const dataInJs = await response.json();
    return dataInJs;
  } catch (error) {
    console.log('myFetchAuth error ===', error);
  }
}

export const baseUrl = process.env.REACT_APP_BACKEND_URL;
if (!baseUrl) throw new Error('baseUrl nerastas');
