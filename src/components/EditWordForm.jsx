import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FloatingInputSelect from './FloatingInputSelect';
import AuthContext from '../context/AuthContext';
import DataContext from '../context/DataContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { notifySuccess } from '../utils/notification';

const EditWordForm = () => {
  const { user } = useContext(AuthContext);
  const { wordTypes } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  const userId = user ? user.id : '';

  const [formData, setFormData] = useState({
    word: '',
    phonetic: '',
    created_by: userId,
    updated_by: userId,
    type_id: '',
    definition: '',
    example: '',
    meaning: '',
  });

  const [errors, setErrors] = useState({});

  // Tải dữ liệu của từ đã tồn tại khi component mount
  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/words/${id}`);
        const wordData = response.data;

        // Cập nhật formData với dữ liệu đã tải
        setFormData({
          word: wordData.word,
          phonetic: wordData.phonetic,
          created_by: wordData.created_by,
          updated_by: wordData.updated_by,
          type_id: wordData.type_id,
          definition: '',
          example: '',
          meaning: '',
        });

        // Tải definition, example, meaning nếu cần thiết
        const definitionResponse = await axios.get(`http://localhost:9999/definitions?word_id=${id}`);
        const definitionData = definitionResponse.data[0]; // Lấy definition đầu tiên nếu có

        if (definitionData) {
          setFormData(prevData => ({
            ...prevData,
            definition: definitionData.definition,
            type_id: definitionData.type_id,
          }));

          const exampleResponse = await axios.get(`http://localhost:9999/examples?definition_id=${definitionData.id}`);
          const exampleData = exampleResponse.data[0]; // Lấy example đầu tiên nếu có

          if (exampleData) {
            setFormData(prevData => ({
              ...prevData,
              example: exampleData.example,
              meaning: exampleData.meaning,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching word data:', error);
        alert('An error occurred while fetching the word data.');
      }
    };

    fetchWordData();
  }, [id]);

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
        // Cập nhật từ
        await axios.put(`http://localhost:9999/words/${id}`, {
          word: formData.word,
          phonetic: formData.phonetic,
          updated_by: userId,
          updated_at: new Date().toISOString()
        });

        // Cập nhật definition
        const definitionResponse = await axios.put(`http://localhost:9999/definitions/${formData.type_id}`, {
          type_id: parseInt(formData.type_id),
          definition: formData.definition,
          updated_at: new Date().toISOString()
        });

        const definitionId = definitionResponse.data.id;

        // Cập nhật example
        await axios.put(`http://localhost:9999/examples/${definitionId}`, {
          example: formData.example,
          meaning: formData.meaning,
          updated_at: new Date().toISOString(),
        });

        notifySuccess('Edit word successfully');
        navigate('/admin/words');
      } catch (error) {
        console.error('Error editing word:', error);
        alert('An error occurred while editing the word.');
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
        Edit Word
      </Button>
    </Form>
  );
};

export default EditWordForm;
