const Header = ({title}) => (
  <h1>{title}</h1>
)

const Part = ({part, exercises}) => (
    <p>
      {part} {exercises}
    </p>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </div>
)

const Total = ({parts}) => {
  const sum = parts.reduce((acc, current) => {
    return acc + current.exercises
  }, 0)

  return <p><strong>Total of {sum} exercises</strong></p>
}

const Course = ({course}) => (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
)

export default Course