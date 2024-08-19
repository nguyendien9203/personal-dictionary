import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import WordPhonetic from './WordPhonetic';
import WordTypes from './WordTypes';
import { DataContext } from '../context/DataContext';

const WordDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const wordId = queryParams.get('id');
  const wordText = queryParams.get('word');

  const { words, wordTypes, definitions } = useContext(DataContext);

  const [wordData, setWordData] = useState(null);

  useEffect(() => {
    const foundWord = words.find(w => w.id.toString() === wordId);

    if (foundWord) {
      setWordData(foundWord);
    } else {
      console.log('Word not found');
    }
  }, [wordId, words]);


  if (!wordData) {
    return null;
  }

  const { word, phonetic } = wordData;

  const relatedDefinitions = definitions.filter(def => def.word_id === parseInt(wordId));
  console.log('dfgdf', relatedDefinitions)

  const typeIds = [...new Set(relatedDefinitions.map(def => def.type_id))];

  const relatedWordTypes = wordTypes.filter(wt => typeIds.includes(wt.id));
  console.log(relatedWordTypes)

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title as="h1">{wordText || word}</Card.Title>
        <WordPhonetic phonetic={phonetic} word={word} />
        <WordTypes wordTypes={relatedWordTypes} definitions={relatedDefinitions} />
      </Card.Body>
    </Card>
  );
};

export default WordDetail;
