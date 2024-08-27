import axios from 'axios';

const SECONDS = 1000;

export const instance = axios.create({
	timeout: 30 * SECONDS,
});
