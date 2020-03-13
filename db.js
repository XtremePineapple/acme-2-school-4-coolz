console.log("db.js")

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://adapapspkjehvi:e1689e7fcfa65640357d35d1940fc37fa5903b221b89de9962d010ab2a160d8d@ec2-3-231-46-238.compute-1.amazonaws.com:5432/d90ftfdt6gg4he?ssl=true');

client.connect();

const sink = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS schools;

        CREATE TABLE schools(
            id UUID PRIMARY KEY default uuid_generate_v4(),
            name VARCHAR(255) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );
        CREATE TABLE students(
            id UUID PRIMARY KEY default uuid_generate_v4(),
            
            name VARCHAR(255) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );
    `
    // console.log(SQL)
    client.query(SQL);
    //school_id UUID REFERENCES schools(id),
    await Promise.all([
        createSchool('SDSU'),
        createSchool('USD'),
        createSchool('UCSD'),
        createSchool('UCSDSUSD'),
        createStudent('Sam'),
        createStudent('Brian'),
        createStudent('Suzie'),
        createStudent('Nina')
    ])
    // await Promise.all([

    // ])
}

const createSchool = async( school ) => {
    console.log(school)
    const SQL = `INSERT INTO schools(name) values($1) returning *`;
    return (await client.query(SQL, [ school ])).rows[0];
}
const createStudent = async( student) => {
    console.log(student)
    const SQL = `INSERT INTO students(name) values($1) returning *`;
    return (await client.query(SQL, [ student ])).rows[0];
}


const readSchools = async() => {
    const SQL = `SELECT * from schools`
    return (await client.query(SQL)).rows;
}
const readStudents = async() => {
    const SQL = `SELECT * from students`
    return (await client.query(SQL)).rows;  
}

const destroySchool = async(id) => {
    const SQL = `DELETE FROM schools where id= $1`
    return (await client.query(SQL, [ id ]))
}
const destroyStudent = async(id) => {
    const SQL = `DELETE FROM students where id= $1`
    return (await client.query(SQL, [ id ]))
}

// const put= async() => {
//     const SQL = 
//     return (await client.query(SQL, []))
// }
// const put= async() => {
//     const SQL = 
//     return (await client.query(SQL, []))
// }

module.exports = {
    sink,
    createSchool,
    createStudent,
    readSchools,
    readStudents,
    destroySchool,
    destroyStudent
}