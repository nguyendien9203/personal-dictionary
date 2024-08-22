import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import FloatingInputSelect from "./FloatingInputSelect";
import DefinitionForm from "./DefinitionForm";

const WordTypeForm = ({ wordType, onChange, onAddDefinition, index }) => {
  return (
    <div>
      <h4>Word Type {index + 1}</h4>
      <FloatingInputSelect
        label="Word Type ID"
        value={wordType.id}
        onChange={(e) => onChange({ ...wordType, id: e.target.value })}
        name={`wordType-${index}`}
      />
      {wordType.definitions.map((definition, defIndex) => (
        <DefinitionForm
          key={defIndex}
          definition={definition}
          onChange={(updatedDefinition) => {
            const updatedDefinitions = [...wordType.definitions];
            updatedDefinitions[defIndex] = updatedDefinition;
            onChange({ ...wordType, definitions: updatedDefinitions });
          }}
          onAddExample={(definitionIndex) => {
            const newDefinition = {
              definition: "",
              examples: [],
            };
            const updatedDefinitions = [...wordType.definitions];
            updatedDefinitions.splice(definitionIndex + 1, 0, newDefinition);
            onChange({ ...wordType, definitions: updatedDefinitions });
          }}
          index={defIndex}
        />
      ))}
      <Button variant="outline-secondary" onClick={onAddDefinition}>
        <i className="bi bi-plus-lg"></i>
      </Button>
    </div>
  );
};

WordTypeForm.propTypes = {
  wordType: PropTypes.shape({
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
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onAddDefinition: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default WordTypeForm;
