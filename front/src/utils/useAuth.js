export default {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
};
