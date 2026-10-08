import { API_KEY_TO_SOURCES } from '../../../config.js'
export async function fetchData(url, options = {}) {
    const defaultHeadrs = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY_TO_SOURCES
    }
    const config = {
        ...options,
        headers: {
            ...defaultHeadrs,
            ...(options.headers || {})
        }
    }

    try {
        const responce = await fetch(url, config);

        if (responce.ok) {
            const data = await responce.json();
            return data;
        } else {
            throw new Error(`Error HTTP: ${responce.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);

    }
}