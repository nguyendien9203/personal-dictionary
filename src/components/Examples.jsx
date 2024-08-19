import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const Examples = ({ definitionId }) => {
  const { examples } = useContext(DataContext);
  const filteredExamples = examples.filter(
    (example) => example.definition_id === definitionId
  );

  console.log("example", filteredExamples)
  return (
    <ListGroup variant="flush">
      {filteredExamples.map((example) => (
        <ListGroup.Item key={example.id}>
          <p>
            <strong>Example:</strong> {example.example}
          </p>
          <p>
            <strong>Meaning:</strong> {example.meaning}
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

Examples.propTypes = {
  definitionId: PropTypes.number.isRequired,
};

export default Examples;
