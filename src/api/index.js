import { DEFAULT_TIMEOUT } from '../config';
import { server, multipartServer } from './server';

const get = (options) => {
  const {
    // prettier-ignore
    token,
    url,
    params = {},
    timeout,
  } = options || {};
  const serverOptions = {
    url,
    timeout: timeout || DEFAULT_TIMEOUT,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  };
  return server(serverOptions);
};

const post = (options) => {
  const {
    // prettier-ignore
    token,
    url,
    data = {},
    timeout,
    multipart = false,
    formData,
    headers,
  } = options || {};
  const serverOptions = {
    url,
    timeout: timeout || DEFAULT_TIMEOUT,
    method: 'post',
    data,
  };

  if (token) {
    serverOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  if (headers) {
    serverOptions.headers = {
      ...serverOptions.headers,
      ...headers,
    };
  }
  if (multipart) {
    serverOptions.data = formData;
    return multipartServer(serverOptions);
  }
  return server(serverOptions);
};

const put = (options) => {
  const {
    // prettier-ignore
    token,
    url,
    timeout,
    data = {},
    multipart = false,
    formData,
  } = options || {};
  const serverOptions = {
    url,
    timeout: timeout || DEFAULT_TIMEOUT,
    method: 'post',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (multipart) {
    serverOptions.data = formData;
    return multipartServer(serverOptions);
  }
  return server(serverOptions);
};

const deleteApi = (options) => {
  const {
    // prettier-ignore
    token,
    url,
    data = {},
    timeout,
  } = options || {};
  const serverOptions = {
    url,
    timeout: timeout || DEFAULT_TIMEOUT,
    method: 'delete',
    data,
  };

  if (token) {
    serverOptions.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return server(serverOptions);
};

export {
  // prettier-ignore
  get,
  post,
  put,
  deleteApi
};
