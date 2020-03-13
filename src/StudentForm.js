console.log('StudentForm.js')
import React, {useState, useEffect} from "react"

const StudentForm = ({ createStudent }) => {
  const [name, setName] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    createStudent({ name });
  };
  return(<section>
    <form onSubmit={onSubmit}>
      <h2>Create Student</h2>
      <input value={ name } onChange={ ev => setName(ev.target.value)} />
      <button>ready for debt</button>
    </form>
  </section>)
};

export default StudentForm