console.log("App.js")

import React, {useState, useEffect} from "react"
import axios from 'axios'

import SchoolForm from './SchoolForm'
import StudentForm from './StudentForm'

import SchoolList from './SchoolList'
import StudentList from './StudentList'

const App = () => {
    // console.log("App func")

    const [error, setError] = useState('');
    const [students, setStudents] = useState([]);
    const [schools, setSchools] = useState([]);

    const createSchool = async(school) => {
        console.log(`createSchool = ${school}`)
        try {
            const created = (await axios.post('/api/schools', school)).data
            console.log(created)
            setSchools([...schools, created]);
            setError('');
        } 
        catch(ex){ 
            setError(ex.response.data.message) 
        }
    };
    const createStudent = async(student, schoolChoice) => {
        try {
            const created = (await axios.post('/api/students', (student, schoolChoice))).data
            console.log(`createStudent => ${created}`)
            setStudents([...students, created]);
            setError('');
        }  
        catch(ex){ 
            setError(ex.response.data.message) 
        }
    }

    const destroyStudent = async(stud)=> {
        try {
          await axios.delete(`/api/students/${stud.id}`);
          setStudents(students.filter( student  => student.id !== stud.id));
          setError('');
        }
        catch(ex){
          setError(ex.response.data.message)
        }
      };

    useEffect(()=> {
        Promise.all([
          axios.get('/api/schools'), 
          axios.get('/api/students'),
        ])
        .then( responses => responses.map( response => response.data))
        .then( results => {
          setSchools(results[0]);
          setStudents(results[1]);
          setError('');
        })
        .catch(ex => setError(ex.response.data.message));
    }, []);

    return (<div>
        <h1>School Database</h1>
        <h3>where students are numbers</h3>
        {
        !!error && <div className='error'>{ error }</div>
        }
        <div className='forms'>
            <SchoolForm createSchool = { createSchool }/>
            <StudentForm createStudent = { createStudent } schools = { schools }/>
        </div>
        <div className='lists'>
            <SchoolList schools = { schools }/>
            <StudentList students={students} schools={schools} destroyStudent={destroyStudent} />
        </div>
    </div>)
}

export default App