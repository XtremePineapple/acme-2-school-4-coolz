console.log('StudentList.js')
import React, {useState, useEffect} from "react"

const StudentList = ({students}) => {
  console.log(students)
  return(<div>
    <h2>Studentz ({ students.length })</h2>
    <ul>
      {students.map(student => {
        return <li key={student.id}>{student.name}</li>
      })}
    </ul>
  </div>)
}
 
export default StudentList