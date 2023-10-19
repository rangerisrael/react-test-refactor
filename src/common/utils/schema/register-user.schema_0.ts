import * as yup from 'yup';




export function uniqueValue(str: string) {
	const value = str.split(' ');
	return [...new Set(value)].join(' ');
}

export const EMAILREGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9\s]{2,4})+$/;
export const UPPERCASE_REGEX = /^((?=.*[a-z])(?=.*[A-Z]).{1,})$/;
export const DIGIT_REGEX = /[0-9]/;
export const CHAR_ONLY_REGEX = /^[A-Za-z\s]+$/;


export const registerSchema = yup.object().shape(
	{
		firstName: yup
			.string()
			.required('The field should not be empty.')
			.when(['firstname'], {
				is: (email: string) => email?.length > 1,
				then: (rule) =>
					rule.test('firstname', 'The name you entered is invalid.', function (value) {
						const emailRegex = EMAILREGEX;

						const isValidEmail = emailRegex.test(value as string);

						if (!isValidEmail && value === uniqueValue(value as string)) {
							return true;
						} else {
							return false;
						}
					}),
			})
			.matches(CHAR_ONLY_REGEX, 'The name you entered is invalid.')
			.min(2, 'The name you entered is invalid.')
			.max(255, 'The name you entered is invalid.'),

		lastName: yup
			.string()
			.required('The field should not be empty.')
			.when(['lastname'], {
				is: (email: string) => email?.length > 1,
				then: (rule) =>
					rule.test('lastname', 'The name you entered is invalid.', function (value) {
						const emailRegex = EMAILREGEX;

						const isValidEmail = emailRegex.test(value as string);

						if (!isValidEmail && value === uniqueValue(value as string)) {
							return true;
						} else {
							return false;
						}
					}),
			})
			.matches(CHAR_ONLY_REGEX, 'The name you entered is invalid.')
			.min(2, 'The name you entered is invalid.')
			.max(255, 'The name you entered is invalid.'),
		email: yup
			.string()
			.required('The field should not be empty.')
			.when(['email'], {
				is: (email: string) => email?.length > 1,
				then: (rule) =>
					rule.test('email', 'The email you entered is invalid.', function (value) {
						const emailRegex = EMAILREGEX;

						const isValidEmail = emailRegex.test(value as string);

						if (isValidEmail) {
							return true;
						} else {
							return false;
						}
					}),
			}),

		phone: yup.string().required('The field should not be empty.'),
		gender: yup.string().required('The field should not be empty.'),
		location: yup.object().shape({
			city: yup.string().required('City is required.'),
		}),
		picture: yup.string().required('The field should not be empty.'),
		dateOfBirth: yup.string().required('The field should not be empty.'),
		registerDate: yup.string(),
		title: yup.string().required('The field should not be empty.'),
	},
	[
		['firstName', 'firstName'],
		['lastName', 'lastName'],
		['email', 'email'],
		['phone', 'phone'],
	],
);

export type RegisterSchemaType = yup.TypeOf<typeof registerSchema>;
