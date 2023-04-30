import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');

  const handleChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      // если строка пустая и мbl нажали кнопку поиска
      toast.error('Please, fill in the input field');
      return;
    }
    if (search === prevSearch) {
      // проверка на одинаковое слово
      toast.info('Same request');
      setSearch('');
      return;
    }
    onSubmit(search); // props из App которому мbl передаем state из єтого компонента в state App
    setPrevSearch(search);
    setSearch(''); // reset
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          name="search"
          value={search}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
