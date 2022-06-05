const Persons = ({ persons, handleDelete }) => {
  return <>
    <h2>Numbers :</h2>
    {persons.map(person =>
      <div key={person.id}>
        <br></br>
        {person.name} {person.number}
        
        <button type="button" onClick={()=>handleDelete(person.id)}>
          delete 
        </button>
        
      </div>
      
    )}
  </>
}

export default Persons