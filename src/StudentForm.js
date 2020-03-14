console.log('StudentForm.js')
import React, {useState, useEffect} from "react"

const StudentForm = ({ createStudent , schools}) => {
  const [name, setName] = useState('');
  const [schoo, setSchoo] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    createStudent({name, schoo});
  };

  return(
    <section>
      <form onSubmit={onSubmit}>
        <h2>Create Student</h2>
        <input value={ name } onChange={ ev => setName(ev.target.value)} />
        <select id="schoolChoice" onChange={ ev => setSchoo(ev.target.value)}>
          {schools.map(school => {
            return(<option value={schoolChoice} key={school.id}>{school.name}</option>)
          })}
        </select>
        <button>ready for debt</button>
      </form>
    </section>
    )
};

export default StudentForm