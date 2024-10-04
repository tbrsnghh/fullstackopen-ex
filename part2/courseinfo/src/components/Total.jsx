const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><b>total of {total} exercises</b></p>;
};
export default Total
