import axios from 'axios';

const SECONDS = 1000;

export const instance = axios.create({
	baseURL: process.env.API_URL,
	timeout: 30 * SECONDS,
	headers: {
		Authorization: `Bearer ${process.env.API_TOKEN}`,
	},
});
