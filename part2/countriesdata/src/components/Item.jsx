import { useState } from "react";

function Item({ country }) {
	const [showDetails, setShowDetails] = useState(false);

	function toggleDetails() {
		setShowDetails((prevState) => !prevState);
	}

	return (
		<div style={{ padding: "5px 0" }}>
			{country.name.common}
			<button onClick={toggleDetails}>{showDetails ? "hide" : "show"}</button>
			{showDetails && (
				<div>
					<div>
						<strong>Capital City:</strong> {country.capital}
					</div>
					<div>
						<strong>Area:</strong> {country.area}
					</div>
					<div>
						<strong>Languages:</strong>
						<ul>
							{Object.entries(country.languages).map((arr) => {
								return <li key={arr[0]}>{arr[1]}</li>;
							})}
						</ul>
					</div>
					<img
						src={country.flags.png}
						alt="flag"
						style={{ marginBottom: "25px" }}
					/>
				</div>
			)}
		</div>
	);
}

export default Item;
