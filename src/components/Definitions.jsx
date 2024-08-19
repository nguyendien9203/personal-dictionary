import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Examples from './Examples';

const Definitions = ({ typeId, definitions }) => {
  return (
    <ListGroup variant="flush">
      {definitions
        .filter(def => def.type_id === parseInt(typeId))
        .map(def => (
          <ListGroup.Item key={def.id}>
            <p><strong>Definition:</strong> {def.definition}</p>
            <Examples definitionId={def.id} />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

Definitions.propTypes = {
    typeId: PropTypes.number.isRequired,
    definitions: PropTypes.array.isRequired
}

export default Definitions;
