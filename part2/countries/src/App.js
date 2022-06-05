import axios from 'axios'
import { useState, useEffect } from 'react'
import Countries from './components/Countries'



const App = () => {
  const [countries, setPays ] = useState([])
  const [filter, setSearchName] = useState('')


  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setPays(response.data)
    })
  }

  useEffect(hook,[])

  const countryToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  
  return (
    <div>
    <div>
      find countries          
      <input
        value={filter}
        onChange={handleSearchChange}
      />
    </div>
    <Countries
      countries={countryToShow}
      setFilter={setSearchName}
    />
    </div>
  )
}

export default App