import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import WordInfoForm from "./WordInfoForm";
import WordTypeForm from "./WordTypeForm";
import DataContext from "../context/DataContext";
import AuthContext from "../context/AuthContext";

const WordForm = () => {
  const { user } = useContext(AuthContext);
  const { wordTypes } = useContext(DataContext);

  const [formData, setFormData] = useState({
    word: "",
    phonetic: "",
    definition: "",
    example: "",
    meaning: "",
    typeId: ""
  });

  const addWordType = () => {
    setWordTypes([...wordTypes, { id: "", definitions: [] }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ wordInfo, wordTypes });
    // Xử lý gửi dữ liệu lên backend ở đây
  };

  return (
    <Form onSubmit={handleSubmit}>
      <WordInfoForm wordInfo={wordInfo} setWordInfo={setWordInfo} />
      {wordTypes.map((wordType, index) => (
        <WordTypeForm
          key={index}
          wordType={wordType}
          onChange={(updatedWordType) => {
            const updatedWordTypes = [...wordTypes];
            updatedWordTypes[index] = updatedWordType;
            setWordTypes(updatedWordTypes);
          }}
          onAddDefinition={() => {
            const newDefinition = {
              definition: "",
              examples: [],
            };
            const updatedWordTypes = [...wordTypes];
            updatedWordTypes[index].definitions.push(newDefinition);
            setWordTypes(updatedWordTypes);
          }}
          index={index}
        />
      ))}
      <Button variant="outline-success" onClick={addWordType}>
        Thêm Word Type
      </Button>
      <Button variant="primary" type="submit">
        Gửi
      </Button>
    </Form>
  );
};

WordForm.propTypes = {
  wordInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phonetic: PropTypes.string,
    createdBy: PropTypes.string,
    updatedBy: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  wordTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      definitions: PropTypes.arrayOf(
        PropTypes.shape({
          definition: PropTypes.string.isRequired,
          examples: PropTypes.arrayOf(
            PropTypes.shape({
              example: PropTypes.string.isRequired,
              meaning: PropTypes.string,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default WordForm;
