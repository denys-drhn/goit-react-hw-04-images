import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=34146115-f93b131a505bf9d05e96b838b&image_type=photo&orientation=horizontal';

export const getImages = async (query, page) => {
  try {
    const response = await axios.get(`&per_page=12&page=${page}&q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
