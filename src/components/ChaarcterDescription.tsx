import Swal from "sweetalert2";
import React, { useEffect } from "react";
import { Modal } from "antd";
import md5 from "crypto-js/md5";

interface CharacterDescriptionProps {
  characterId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CharacterDescription = ({
  characterId,
  open,
  setOpen,
}: CharacterDescriptionProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [character, setCharacter] = React.useState<any>(null);

  const PRIVATE_KEY = "3e8fc5211bf0b72ffb80474c48906e8a33bc0746";
  const PUBLIC_KEY = "ba6056e5af5ad1ad6d198a7646a21268";

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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

    showLoading();
  };

  //handle close modal
  const handleClose = () => {
    setOpen(false);
    setCharacter(null);
  };

  useEffect(() => {
    if (open) fetchCharacter();
  }, [open]);

  return (
    <>
      {character && (
        <Modal loading={loading} open={open} onCancel={() => handleClose()}>
          <h2>
            {character?.name} ({character?.id})
          </h2>
          <p>
            <img
              src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
              alt={character?.name}
              width={250}
            />
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {character?.description === ""
              ? "No hay descripción"
              : character?.description}
          </p>

          <p>
            <strong>Comics:</strong>{" "}
            <ul>
              {character?.comics.items.map((comic: any) => (
                <li key={comic.name}>{comic.name}</li>
              ))}
            </ul>
          </p>
        </Modal>
      )}
    </>
  );
};

export default CharacterDescription;
