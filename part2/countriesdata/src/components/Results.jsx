import Item from "./Item";
import OneCountry from "./OneCountry";
function Results({ filteredData, search }) {
  if (filteredData.length > 10 && search === "") {
    return;
  } else if (filteredData.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (filteredData.length === 1) {
    return <OneCountry filtered={filteredData} />;
  } else if (filteredData.length <= 10) {
    return (
      <div>
        {filteredData.map((country) => {
          return <Item key={country.area} country={country} />;
        })}
      </div>
    );
  }
}

export default Results;
