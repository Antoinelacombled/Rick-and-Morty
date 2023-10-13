import './searchcharacter.scss'
import { useState } from 'react';

function SearchCharacter({ onSearch }) {

    const [value, setValue] = useState('');

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSearch(value);
    }

    return (
        <form onSubmit={handleSubmitForm} >
            <label className='search-label' >Chercher un personnage</label><br></br>
            <input
                className='search-input'
                type='text'
                placeholder='Rick, Morty, Jerry etc...'
                value={value}
                onChange={handleInputChange}
            ></input>
            <button type='submit' className='search-button'>search</button>
        </form>
    );
}

export default SearchCharacter;