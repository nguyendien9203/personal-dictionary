import { useContext } from "react";
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { searchQuery, setSearchQuery, words, setSelectedWord } =
    useContext(DataContext);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickWord = (word) => {
    setSelectedWord(word);
    setSearchQuery('');
    navigate(`/wordDetail?id=${word.id}&word=${word.word}`);
  };

  const searchResult = words.filter((w) =>
    w.word.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <div
      className="search-bar my-5"
      style={{ position: "relative", padding: "0 150px" }}
    >
      <InputGroup className="d-flex my-1">
        <Form.Control
          placeholder="Search for a word..."
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Button variant="outline-secondary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      {searchQuery && searchResult.length > 0 && (
        <ListGroup
          className="search-results"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 1000,
            padding: "0 150px",
          }}
        >
          {searchResult.map((item) => (
            <ListGroup.Item
              key={item.id}
              action
              onClick={() => handleClickWord(item)}
            >
              {item.word}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
};

export default Search;
