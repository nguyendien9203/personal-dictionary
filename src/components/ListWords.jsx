import { useContext } from "react";
import DataContext from "../context/DataContext";
import { Table, Button } from "react-bootstrap";
import SpeakButton from "./SpeakButton";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

const ListWords = () => {
  const { words, wordTypes, definitions, filterWordTypes, setFilterWordTypes, setSelectedWord } =
    useContext(DataContext);

  const navigate = useNavigate();

  const filtedWords = words.filter((item) => {
    const definition = definitions.find((def) => def.word_id === item.id);

    if (!definition) return false;

    const typeId = definition ? definition.type_id : null;

    return filterWordTypes.includes(typeId.toString());
  });

  const handleClickWord = (word) => {
    setSelectedWord(word);
    navigate(`/wordDetail?id=${word.id}&word=${word.word}`);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full">
        <div className="flex justify-end mb-2">
          <Filter
            wordTypes={wordTypes}
            filterWordTypes={filterWordTypes}
            setFilterWordTypes={setFilterWordTypes}
          />
          <Button variant="light" className="mx-2">
            <i className="bi bi-plus-lg"></i> Add word
          </Button>
        </div>

        {filtedWords.length > 0 ? (
          <Table>
            <tbody>
              {filtedWords.map((item) => {
                const definition = definitions.find(
                  (def) => def.word_id === item.id
                );
                const typeId = definition ? definition.type_id : null;

                const wordType =
                  wordTypes.find((type) => type.id === typeId)?.type ||
                  "unknown";

                return (
                  <tr key={item.id}>
                    <td>
                      <strong className="text-[#0D53B0] font-normal hover:cursor-pointer" onClick={() => handleClickWord(item)}>
                        {item.word}
                      </strong>
                      <small className="px-3">{wordType}</small>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <SpeakButton
                          text={item.word}
                          lang="en-GB"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                        <SpeakButton
                          text={item.word}
                          lang="en-US"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                        <Button variant="light">
                          <i className="bi bi-pencil"></i> Edit
                        </Button>
                        <Button variant="light">
                          <i className="bi bi-calendar-x"></i> Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No words found</p>
        )}
      </div>
    </div>
  );
};

export default ListWords;
