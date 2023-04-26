import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../services/ImagesApiServise';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    tags: '',
    total: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });

      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        toast.error('Sorry, there are no images found');
        return;
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // for button
  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  // modal
  onOpenModal = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImage, tags, total, error } =
      this.state;
    const totalPage = total / images.length;
    return (
      <>
        {/* // Searchbar // */}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* // Loader // */}
        {isLoading && <Loader />}
        {/* // ImageGallery // */}
        {images.length !== 0 && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {/* // Button // */}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
        {/* // Modal // */}
        {showModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
        {/* // Error // */}
        {error && (
          <div>
            We didn't find anything for this search :(
            <span>Try another option</span>
          </div>
        )}
        {/* // Notification Container // */}
        <ToastContainer autoClose={4000} theme="light" />
      </>
    );
  }
}
