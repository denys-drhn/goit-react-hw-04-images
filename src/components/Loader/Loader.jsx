import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.Loader}>
    <InfinitySpin width="200" color="#4fa94d" />
  </div>
);

export default Loader;
