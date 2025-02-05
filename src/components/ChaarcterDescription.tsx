import Swal from "sweetalert2";
import React, { useEffect } from "react";
import { Modal } from "antd";
import md5 from "crypto-js/md5";
import { Character } from "../types/Character.type";
import { useCharacterDescription } from "../hooks/UseCharacterDescription";

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
  const { character, setCharacter, characterDescriptionLoading } =
    useCharacterDescription(characterId, open);

  //handle close modal
  const handleClose = () => {
    setOpen(false);
    setCharacter(null);
  };

  return (
    <>
      {character && (
        <Modal
          loading={characterDescriptionLoading}
          open={open}
          onCancel={() => handleClose()}
        >
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
