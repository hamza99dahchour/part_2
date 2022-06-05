const Country = ({ country }) => {

  const languages = Object.values(country.languages)
  const capital = country.capital[0]


  
  return <div>
    <h2>{country.name.common}</h2>
    <div>capital {capital} </div>
    <div>area {country.area} </div>

    <h4>languages:</h4>
    <ul>
      {languages.map(
        language => <li key={language}>{language}</li>
      )}
    </ul>


    <div><img alt="Country Flag" src={country.flags.png} height="100" width="150" /></div>

  </div>
}

export default Country