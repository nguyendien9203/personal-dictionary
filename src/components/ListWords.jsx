import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import AuthContext from "../context/AuthContext";
import { Table, Button } from "react-bootstrap";
import SpeakButton from "./SpeakButton";
import Filter from "./Filter";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { notifySuccess, notifyError } from "../utils/notification";
import axios from "axios";

const ListWords = () => {
  const {
    words,
    wordTypes,
    definitions,
    proposals,
    filterWordTypes,
    setFilterWordTypes,
    setSelectedWord,
  } = useContext(DataContext);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.notifySuccess) {
      window.location.reload();
      notifySuccess('Word added successfully!');
    }
  }, [location.state]);

  const { isAdmin } = useContext(AuthContext);
  const admin = isAdmin();

  const navigate = useNavigate();

  const filteredWords = words.filter((word) => {
    const definition = definitions.find((def) => def.word_id === word.id);

    if (!definition) return false;

    const typeId = definition.type_id;

    const proposal = proposals.find((pro) => pro.word_id === word.id);

    // Điều kiện để giữ lại từ:
    // 1. Từ không có trong đề xuất, hoặc
    // 2. Từ có đề xuất với status là "accepted"
    const shouldKeepWord = (!proposal || proposal.status === "accepted");

    return shouldKeepWord && filterWordTypes.includes(typeId.toString());
  });

  const handleClickWord = (word) => {
    setSelectedWord(word);
    navigate(`/wordDetail?id=${word.id}&word=${word.word}`);
  };

  const handleRemoveWord = async (wordId) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      try {
        // Lấy definition liên quan đến wordId
        const definitionResponse = await axios.get(`http://localhost:9999/definitions?word_id=${wordId}`);
        const definitionsData = definitionResponse.data;
  
        // Xóa các definition liên quan
        for (const definition of definitionsData) {
          await axios.delete(`http://localhost:9999/definitions/${definition.id}`);
  
          // Lấy các examples liên quan đến definition
          const exampleResponse = await axios.get(`http://localhost:9999/examples?definition_id=${definition.id}`);
          const examplesData = exampleResponse.data;
  
          // Xóa các example liên quan
          for (const example of examplesData) {
            await axios.delete(`http://localhost:9999/examples/${example.id}`);
          }
        }
  
        // Xóa từ chính
        await axios.delete(`http://localhost:9999/words/${wordId}`);
        notifySuccess("Word and its related data deleted successfully!");
        window.location.reload(); // Reload trang để cập nhật danh sách
      } catch (error) {
        console.error("Error deleting word and its related data:", error);
        notifyError("An error occurred while deleting the word.");
      }
    }
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
          {admin && (
            <Button variant="light" as={Link} to="/admin/words/add" className="mx-2">
              <i className="bi bi-plus-lg"></i> Add word
            </Button>
          )}
        </div>

        {filteredWords.length > 0 ? (
          <Table>
            <tbody>
              {filteredWords.map((word) => {
                const definition = definitions.find(
                  (def) => def.word_id === word.id
                );
                const typeId = definition ? definition.type_id : null;

                const wordType =
                  wordTypes.find((type) => type.id === typeId)?.type ||
                  "unknown";

                return (
                  <tr key={word.id}>
                    <td>
                      <strong
                        className="text-[#0D53B0] font-normal hover:cursor-pointer"
                        onClick={() => handleClickWord(word)}
                      >
                        {word.word}
                      </strong>
                      <small className="px-3">{wordType}</small>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <SpeakButton
                          text={word.word}
                          lang="en-GB"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                        <SpeakButton
                          text={word.word}
                          lang="en-US"
                          label={<i className="bi bi-volume-up"></i>}
                        />
                        {admin && (
                          <>
                            <Button variant="light" as={Link} to={`/admin/words/edit/${word.id}`}>
                              <i className="bi bi-pencil"></i> Edit
                            </Button>
                            <Button variant="light" onClick={() => handleRemoveWord(word.id)}>
                              <i className="bi bi-calendar-x"></i> Remove
                            </Button>
                          </>
                        )}
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
