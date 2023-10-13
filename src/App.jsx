import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchCharacter from './components/SearchCharacter/SearchCharacter'
import Characters from './components/Characters/Characters'

function App() {

  const [searchValue, setSearchValue] = useState('');

  const onSearch = (value) => {
    setSearchValue(value);

    console.log(value);
  };



  return (
    <div className='super-container'>
      <SearchCharacter onSearch={onSearch} />
      <Characters searchQuery={searchValue} />
    </div>
  )
}

export default App
