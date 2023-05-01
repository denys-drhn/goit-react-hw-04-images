import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => onOpenModal(largeImageURL, tags)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
