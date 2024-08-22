import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import FloatingInputSelect from './FloatingInputSelect';
import AuthContext from '../context/AuthContext';
import DataContext from '../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notifySuccess } from '../utils/notification';

const AddWordForm = () => {
  const { user } = useContext(AuthContext);
  const { wordTypes } = useContext(DataContext);
  const navigate = useNavigate();

  const userId = user ? user.id : '';

  console.log("user add", user)
  console.log("id add", userId);

  const [formData, setFormData] = useState({
    word: '',
    phonetic: '',
    created_by: userId,
    updated_by: userId, 
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    type_id: '',
    definition: '',
    example: '',
    meaning: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate word
    if (!formData.word.trim()) {
      newErrors.word = 'Word is required.';
    }

    // Validate phonetic
    if (!formData.phonetic.trim()) {
      newErrors.phonetic = 'Phonetic is required.';
    }

    // Validate type_id
    if (!formData.type_id) {
        newErrors.type_id = 'Word type is required.';
    }

    // Validate definition
    if (!formData.definition.trim()) {
      newErrors.definition = 'Definition is required.';
    }

    // Validate example
    if (!formData.example.trim()) {
      newErrors.example = 'Example is required.';
    }

    // Validate meaning
    if (!formData.meaning.trim()) {
      newErrors.meaning = 'Meaning is required.';
    }

    setErrors(newErrors);

    // Check if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        try {
            const wordResponse = await axios.post('http://localhost:9999/words', {
                word: formData.word,
                phonetic: formData.phonetic,
                created_by: userId,
                updated_by: userId,
                created_at: formData.created_at,
                updated_at: formData.updated_at,
            });

            const wordId = wordResponse.data.id;

            const definitionResponse = await axios.post('http://localhost:9999/definitions', {
                word_id: wordId,
                type_id: parseInt(formData.type_id),
                definition: formData.definition,
                created_at: formData.created_at,
                updated_at: formData.updated_at,
            });

            const definitionId = definitionResponse.data.id;

            await axios.post('http://localhost:9999/examples', {
                definition_id: definitionId,
                example: formData.example,
                meaning: formData.meaning,
                created_at: formData.created_at,
                updated_at: formData.updated_at,
            });


            notifySuccess('Add word successfully');
            navigate('/admin/words');
        } catch (error) {
            console.error('Error adding word:', error);
            alert('An error occurred while adding the word.');
        }
    }
};

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingInputSelect
        label="Word"
        name="word"
        value={formData.word}
        onChange={handleInputChange}
        isInvalid={!!errors.word}
        errorMessage={errors.word}
      />

      <FloatingInputSelect
        label="Phonetic"
        name="phonetic"
        value={formData.phonetic}
        onChange={handleInputChange}
        isInvalid={!!errors.phonetic}
        errorMessage={errors.phonetic}
      />

      <FloatingInputSelect
        label="Word Type"
        name="type_id"
        type="select"
        value={formData.type_id}
        onChange={handleInputChange}
        options={wordTypes.map((wt) => ({
          value: parseInt(wt.id),
          label: wt.type,
        }))}
        isInvalid={!!errors.type_id}
        errorMessage={errors.type_id}
      />

      <FloatingInputSelect
        label="Definition"
        name="definition"
        value={formData.definition}
        onChange={handleInputChange}
        isInvalid={!!errors.definition}
        errorMessage={errors.definition}
      />

      <FloatingInputSelect
        label="Example"
        name="example"
        value={formData.example}
        onChange={handleInputChange}
        isInvalid={!!errors.example}
        errorMessage={errors.example}
      />

      <FloatingInputSelect
        label="Meaning"
        name="meaning"
        value={formData.meaning}
        onChange={handleInputChange}
        isInvalid={!!errors.meaning}
        errorMessage={errors.meaning}
      />

      <Button variant="primary" type="submit">
        Add Word
      </Button>
    </Form>
  );
};

export default AddWordForm;
