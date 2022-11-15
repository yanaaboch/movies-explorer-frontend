import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/icon.svg';

const SearchForm = () => {
  return (
    <section className='search'>
      <form className='search__form'>
        <img className='search__icon' src={icon} alt='Лупа' />
        <input
          type='text'
          placeholder='Фильм'
          className='search__input'
          required
        />
        <button className='search__button' type='submit'>
        </button>
      </form>

      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;