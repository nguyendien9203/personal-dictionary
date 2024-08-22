import PropTypes from 'prop-types';
import FloatingInputSelect from './FloatingInputSelect';

const WordInfoForm = ({ wordInfo, setWordInfo }) => {
    return (
        <div>
            <FloatingInputSelect
                label="Word"
                value={wordInfo.word}
                onChange={(e) => setWordInfo({ ...wordInfo, name: e.target.value })}
                name="word"
            />
            <FloatingInputSelect
                label="Phonetic"
                value={wordInfo.phonetic}
                onChange={(e) => setWordInfo({ ...wordInfo, phonetic: e.target.value })}
                name="phonetic"
            />
        </div>
    );
};

WordInfoForm.propTypes = {
    wordInfo: PropTypes.shape({
        word: PropTypes.string.isRequired,
        phonetic: PropTypes.string,
        createdBy: PropTypes.string,
        updatedBy: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
    }).isRequired,
    setWordInfo: PropTypes.func.isRequired,
};

export default WordInfoForm;
