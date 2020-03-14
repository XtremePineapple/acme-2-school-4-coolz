console.log('SchoolList.js')
import React, {useState, useEffect} from "react"

const SchoolList = ({schools}) => {
  // console.log(schools)
  return(<div>
    <h2>Schoolz ({ schools.length })</h2>
    <ul>
      {schools.map(school => {
        return <li key={school.id}>{school.name}</li>
      })}
    </ul>
  </div>)
}
 
export default SchoolList