import { useState, useEffect } from "react";
import axios from "axios";

import Results from "./components/Results";

function App() {
	const [search, setSearch] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [allCountries, setCountries] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	useEffect(() => {
		setFiltered(
			allCountries.filter((country) =>
				country.name.common.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [allCountries, search]);

	return (
		<div className="App">
			Find Countries:{" "}
			<input
				type="search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
			<Results filteredData={filtered} search={search} />
		</div>
	);
}

export default App;