const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Part = (props) => {
  return(
    <>
      <p>
          {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}
const Content = (props) => {
  return(
    <>
      <Part part={props.content[0]}/>
      <Part part={props.content[1]}/>
      <Part part={props.content[2]}/>
    </>
  )
}
const Total = (props) => {
  return(
    <>
       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header course={course.name} />
    <Content content={course.parts}/>
    <Total  parts={course.parts}/>
  </div>
  )
}

export default App