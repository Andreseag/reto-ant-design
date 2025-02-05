// create custom hook to fetch character detail

import { useEffect, useState } from "react";

import md5 from "crypto-js/md5";
import Swal from "sweetalert2";

export const useCharacterDetail = (characterId: number) => {
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const PRIVATE_KEY = "3e8fc5211bf0b72ffb80474c48906e8a33bc0746";
  const PUBLIC_KEY = "ba6056e5af5ad1ad6d198a7646a21268";

  const fetchCharacter = async () => {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacter(data.data.results[0]);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error al cargar el personaje",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return { character, loading };
};
