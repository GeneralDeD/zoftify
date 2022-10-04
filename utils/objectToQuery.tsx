export const ObjectToQuery = (obj: object) => {
	let str = "";

	const values = Object.entries(obj);

	values.map((value) => (str += `${value[0]}=${value[1]}&`));

	return str.slice(0, -1);
};
