import axios from 'axios';
export const fetchAppData = () => axios.get('/app/data');