import React from "react"

const Header = ({ name }) => {
   return (
      <h1>
         {name}
      </h1>
   )
};

const Part = ({ part }) => {
   return (
      <li>
         {part.name} <b>{part.exercises}</b>
      </li>
   )
};

const Content = ({ parts }) => {
   const elements = parts.map(elem =>
      <Part key={elem.id} part={elem} />
   );

   return (
      <ul>
         {elements}
      </ul>
   )
};

const Total = ({ parts }) => {
   const totalExercises = parts.reduce((a, b) => {
      return {exercises: a.exercises + b.exercises}
   })

   return (
      <p><b>A total of {totalExercises.exercises} exercises</b></p>
   )
};

const Course = ({ course }) => {
   return (
      <div>
         <Header name={course.name} />
         <Content parts={course.parts} />
         <Total parts={course.parts} />
      </div>
   )
};

export default Course