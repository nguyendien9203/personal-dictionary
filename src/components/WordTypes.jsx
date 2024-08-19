import { Accordion } from 'react-bootstrap';
import Definitions from './Definitions';
import PropTypes from 'prop-types';

const WordTypes = ({ wordTypes, definitions }) => {
  return (
    <Accordion defaultActiveKey="0">
      {wordTypes.map((type, index) => (
        <Accordion.Item eventKey={index.toString()} key={type.id}>
          <Accordion.Header>{type.type}</Accordion.Header>
          <Accordion.Body>
            <Definitions typeId={type.id} definitions={definitions} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

WordTypes.propTypes = {
    wordTypes: PropTypes.array.isRequired,
    definitions: PropTypes.array.isRequired
}

export default WordTypes;
