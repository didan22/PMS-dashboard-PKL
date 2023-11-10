export default function inputValidation(
	input = {},
	reqField = { name: "Label" }
) {
	const inputStatus = {
		valid: true,
		errMessage: "",
	}

	for (const [key, value] of Object.entries(reqField)) {
		if (!input[key] || input[key].length == 0) {
			inputStatus.valid = false
			inputStatus.errMessage += `${value}, `
		}
	}

	return inputStatus
}
