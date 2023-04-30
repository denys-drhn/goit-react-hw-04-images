import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../services/ImagesApiServise';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async (query, page) => {
      try {
        setIsLoading(true);
        const data = await getImages(query, page);
        if (data.hits.length === 0) {
          toast.error('Sorry, there are no images found');
          return;
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotal(data.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query === '') {
      return;
    }
    fetchImages(query, page);
  }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  // for button
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  // modal
  const onOpenModal = (largeImage, tags) => {
    setShowModal(true);
    setLargeImage(largeImage);
    setTags(tags);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTags('');
  };

  const totalPage = total / images.length;

  return (
    <>
      {/* // Searchbar // */}
      <Searchbar onSubmit={handleFormSubmit} />
      {/* // Loader // */}
      {isLoading && <Loader />}
      {/* // ImageGallery // */}
      {images.length !== 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}
      {/* // Button // */}
      {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={handleLoadMore} />
      )}
      {/* // Modal // */}
      {showModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          onCloseModal={onCloseModal}
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
