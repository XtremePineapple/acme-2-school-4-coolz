console.log('SchoolForm.js')
import React, {useState, useEffect} from "react"

const SchoolForm = ({ createSchool }) => {
  const [name, setName] = useState('');
  const onSubmit = (ev)=> {
    ev.preventDefault();
    createSchool({ name });
  };
  return(<section>
    <form onSubmit={onSubmit}>
      <h2>Create School</h2>
      <input value={ name } onChange={ ev => setName(ev.target.value)} />
      <button>do iiiiiit</button>
    </form>
  </section>)
};

export default SchoolForm