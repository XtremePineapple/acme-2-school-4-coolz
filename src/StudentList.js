console.log('StudentList.js')
import React, {useState, useEffect} from "react"

const StudentList = ({students, schools, destroyStudent}) => {
  console.log(students)
  console.log(schools)
  return(<div>
    <h2>Studentz ({ students.length })</h2>
    <ul>
      {students.map(student => {
        return <li key={student.id}>
          <h2>{student.name}</h2>
          <p>goes to {
            schools.filter(schoo => schoo.id === student.schoolID)[0].name
          }</p>
          <button onClick = {() => destroyStudent(student)}>Kill 'em</button>
        </li>
      })}
    </ul>
  </div>)
}
 
export default StudentList