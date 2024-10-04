import Part from "./Part";

export default function Content(props) {
  return (
    <div>
        {props.parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}
