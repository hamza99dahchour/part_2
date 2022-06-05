import Country from './Country'
const Countries = ({ countries, setFilter }) => {
  if (countries.length>=9) {
    return "Too many countries, specify some other fliter"
  }

  else if (countries.length===0) {
    return "No matches, specify some other fliter"
  }

  else if (countries.length>1) {
    return (
      <div>
        {countries.map(({name}) =>
          <div key={name.common}>
            {name.common}
            <button onClick={() => setFilter(name.common)}>show</button>
          </div>
        )}
      </div>
    )
  }

  else{
    return <Country country={countries[0]} />
  }
}

export default Countries