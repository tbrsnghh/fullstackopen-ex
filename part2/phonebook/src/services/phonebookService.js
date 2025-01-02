import axios from "axios";
const URL = "/api/persons";

const getAll = () => {
	const data = axios.get(URL);
	return data.then((response) => response.data);
};

const createPerson = (newObject) => {
	const data = axios.post(URL, newObject);
	return data.then((response) => response.data);
};

const updatePerson = (id, newObject) => {
	const data = axios.put(`${URL}/${id}`, newObject);
	return data.then((response) => response.data);
};

const deletePerson = (id, obj) => {
	const data = axios.delete(`${URL}/${id}`, { data: obj });
	return data.then((response) => response.data);
};

const phonebookService = {
	getAll,
	createPerson,
	updatePerson,
	deletePerson,
};

export default phonebookService;