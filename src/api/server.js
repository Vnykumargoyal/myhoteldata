import axios from 'axios';

const server = axios.create({
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// for file upload
const multipartServer = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  httpsAgent: false,
  httpAgent: false,
});

const downloadServer = axios.create({
  mode: 'cors',
  headers: {
    responseType: 'blob',
  },
  // httpsAgent,
});

server.interceptors.response.use(
  (response) => response,
  (e) => e
);

downloadServer.interceptors.response.use(
  (response) => response,
  (e) => e
);
// multipartServer.interceptors.response.use(
//   (response) => response.data.data,
//   (e) => e
// );

export { server, multipartServer, downloadServer };
