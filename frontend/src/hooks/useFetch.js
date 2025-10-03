import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearToken } from '../helpers/auth';

//defino url base del back
const BASE_URL = 'http://localhost:3000';

export function useFetch(url, options = {}, { requireAuth = false } = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    //construye url completa concatenando la base y el endpoint (url)
    const fullUrl = `${BASE_URL}${url}`;

    useEffect(() => {
        const controller = new AbortController();
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const token = getToken();
                const headers = {
                    ...(options.headers || {}),
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                };
                
                // usa fullUrl en lugar de la 'url' original
                const res = await fetch(fullUrl, { ...options, headers, signal: controller.signal });
                if (res.status === 401 && requireAuth) {
                    clearToken();
                    navigate("/login");
                    return;
                }
                
                if (!res.ok) throw new Error(res.statusText);
                
                const json = await res.json();

                // extrae el array de libros de la propiedad 'data' de la respuesta de la api
                setData(json.data); 
                
            } catch (err) {
                if (err.name !== "AbortError") setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        return () => controller.abort();
    }, [fullUrl, requireAuth, navigate]);
    
    return { data, loading, error };
}