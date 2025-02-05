import { useState } from "react";
import { Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import CharacterDescription from "./ChaarcterDescription";
import { useCharacters } from "../hooks/useCharactersList";
import { Character } from "../types/Character.type";

const ListCharacters = () => {
  // Marvel API keys

  // States
  const [open, setOpen] = useState(false);
  const { characters, loadingCharacters } = useCharacters();
  const [characterId, setCharacterId] = useState<number>(0);

  // Handle click to show character description
  const showCharacterDescription = (id: number) => {
    setCharacterId(id);
    setOpen(true);
  };

  // Table columns
  const columns: TableProps<Character>["columns"] = [
    {
      title: "Foto",
      key: "thumbnail",
      render: (_, character) => (
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
          width={80}
        />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_, character) => (
        <a onClick={() => showCharacterDescription(character.id)}>
          {character.name}
        </a>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <>{text === "" ? <p>No hay descripción</p> : <p>{text}</p>}</>
      ),
    },
    {
      title: "Series",
      key: "thumbnail",
      render: (_, character) => (
        <>
          {character.series.items.map((serie) => {
            return (
              <Space size={[8, 16]} key={serie.name}>
                <a
                  style={{
                    marginBottom: "8px",
                  }}
                  href={serie.resourceURI}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Tag color="green">{serie.name}</Tag>
                </a>
              </Space>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      {loadingCharacters ? (
        <Spin tip="Cargando..." size="large">
          ""
        </Spin>
      ) : (
        <>
          <Table<Character> columns={columns} dataSource={characters} />
          <CharacterDescription
            characterId={characterId}
            open={open}
            setOpen={setOpen}
          />
        </>
      )}
    </>
  );
};

export default ListCharacters;
