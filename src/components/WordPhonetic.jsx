import SpeakButton from "./SpeakButton";
import PropTypes from 'prop-types';

const WordPhonetic = ({ phonetic, word }) => {
  return (
    <div className="mb-3">
      <h5 className="text-muted">{phonetic}</h5>
      <div className="d-flex">
        <SpeakButton
          text={word}
          lang="en-GB"
          label={<i className="bi bi-volume-up"></i>}
        />
        <SpeakButton
          text={word}
          lang="en-US"
          label={<i className="bi bi-volume-up"></i>}
        />
      </div>
    </div>
  );
};

WordPhonetic.propTypes = {
    phonetic: PropTypes.string.isRequired,
    word: PropTypes.string.isRequired
}

export default WordPhonetic;
