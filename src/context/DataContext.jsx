import {createContext, useState, useEffect} from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [wordTypes, setWordTypes] = useState([]);
    const [words, setWords] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [examples, setExamples] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterWordTypes, setFilterWordTypes] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:9999/users');
                setUsers(usersResponse.data);
                const wordTypesResponse = await axios.get('http://localhost:9999/word_types');
                setWordTypes(wordTypesResponse.data);
                setFilterWordTypes(wordTypesResponse.data.map(wt => wt.id.toString()));
                const wordsResponse = await axios.get('http://localhost:9999/words');
                setWords(wordsResponse.data);
                const definitionsResponse = await axios.get('http://localhost:9999/definitions');
                setDefinitions(definitionsResponse.data);
                const examplesResponse = await axios.get('http://localhost:9999/examples');
                setExamples(examplesResponse.data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        }

        fetchData();
    }, []);


  return (
    <DataContext.Provider value={{
        users,
        wordTypes,
        words,
        definitions,
        examples,
        proposals,
        searchQuery,
        filterWordTypes,
        selectedWord,
        setSearchQuery,
        setFilterWordTypes,
        setSelectedWord
    }}>
        {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default DataContext