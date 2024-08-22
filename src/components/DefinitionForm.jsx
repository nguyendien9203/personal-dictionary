import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import FloatingInputSelect from "./FloatingInputSelect";
import ExampleForm from "./ExampleForm";

const DefinitionForm = ({ definition, onChange, onAddExample, index }) => {
  return (
    <div>
      <h5>Definition {index + 1}</h5>
      <FloatingInputSelect
        label="Definition"
        value={definition.definition}
        onChange={(e) =>
          onChange({ ...definition, definition: e.target.value })
        }
        name={`definition-${index}`}
      />
      {definition.examples.map((example, exIndex) => (
        <ExampleForm
          key={exIndex}
          example={example}
          onChange={(updatedExample) => {
            const updatedExamples = [...definition.examples];
            updatedExamples[exIndex] = updatedExample;
            onChange({ ...definition, examples: updatedExamples });
          }}
          onAdd={() => onAddExample(index)}
        />
      ))}
      <Button variant="outline-secondary" onClick={() => onAddExample(index)}>
        <i className="bi bi-plus-lg"></i>
      </Button>
    </div>
  );
};

DefinitionForm.propTypes = {
  definition: PropTypes.shape({
    definition: PropTypes.string.isRequired,
    examples: PropTypes.arrayOf(
      PropTypes.shape({
        example: PropTypes.string.isRequired,
        meaning: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onAddExample: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default DefinitionForm;
