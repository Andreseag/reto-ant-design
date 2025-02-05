import { useEffect, useState } from "react";
import md5 from "crypto-js/md5";
import Swal from "sweetalert2";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const fetchCharacters = async () => {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error al cargar los personajes",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { characters, loadingCharacters: loading };
};
