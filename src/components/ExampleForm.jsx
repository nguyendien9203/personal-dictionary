import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import FloatingInputSelect from "./FloatingInputSelect";

const ExampleForm = ({ example, onChange, onAdd }) => {
  return (
    <div>
      <FloatingInputSelect
        label="Example"
        value={example.example}
        onChange={(e) => onChange({ ...example, example: e.target.value })}
        name="example"
      />
      <FloatingInputSelect
        label="Meaning"
        value={example.meaning}
        onChange={(e) => onChange({ ...example, meaning: e.target.value })}
        name="meaning"
      />
      <Button variant="outline-secondary" onClick={onAdd}>
        <i className="bi bi-plus-lg"></i>
      </Button>
    </div>
  );
};

ExampleForm.propTypes = {
  example: PropTypes.shape({
    example: PropTypes.string.isRequired,
    meaning: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ExampleForm;
