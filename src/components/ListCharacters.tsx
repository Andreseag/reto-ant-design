import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import md5 from "crypto-js/md5";
import CharacterDescription from "./ChaarcterDescription";

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: Url[];
}

interface Url {
  type: string;
  url: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: Item2[];
  returned: number;
}

interface Item2 {
  resourceURI: string;
  name: string;
  type: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

interface Item {
  resourceURI: string;
  name: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

const ListCharacters = () => {
  // Marvel API keys
  const PRIVATE_KEY = "3e8fc5211bf0b72ffb80474c48906e8a33bc0746";
  const PUBLIC_KEY = "ba6056e5af5ad1ad6d198a7646a21268";

  // States
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterId, setCharacterId] = useState<number>(0);

  // Fetch Marvel characters
  const fetchPersons = async () => {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error("Error fetching Marvel data:", error);
    }
  };

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

  // Fetch characters on component mount
  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <>
      <Table<Character> columns={columns} dataSource={characters} />
      <CharacterDescription
        characterId={characterId}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default ListCharacters;
