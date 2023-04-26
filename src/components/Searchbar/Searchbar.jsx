import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handleChange = event => {
    this.setState({ search: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      // если строка пустая и мbl нажали кнопку поиска
      toast.error('Please, fill in the input field');
      return;
    }
    this.props.onSubmit(this.state.search); // props из App которому мbl передаем state из єтого компонента в state App
    this.setState({ search: '' }); // reset
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
