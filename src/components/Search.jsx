import { useContext, useState, useEffect } from "react";
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { DataContext } from "../context/DataContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { searchQuery, setSearchQuery, words, setSelectedWord } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);

  const userId = user ? user.id : null;
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();
  const key = userId ? `searchHistory_${userId}` : `searchHistory_guest`;

  // Lưu lịch sử tìm kiếm vào localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(key)) || [];
    setSearchHistory(history);
  }, [userId]);

  console.log(searchHistory)

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Hiện lịch sử tìm kiếm nếu không có từ khóa nào được nhập
    setShowHistory(query.length === 0);
  };

  const handleClickWord = (word) => {
    setSelectedWord(word);
    setSearchQuery("");
    setShowHistory(false);

    console.log("word click", word);
    // Cập nhật lịch sử tìm kiếm
    const updatedHistory = [
      word.id,
      ...searchHistory.filter((item) => item !== word.id),
    ];

    // Giới hạn lịch sử chỉ chứa 15 từ
    if (updatedHistory.length > 15) {
      updatedHistory.pop(); // xóa lịch sử cũ nhất
    }

    setSearchHistory(updatedHistory);
    localStorage.setItem(key, JSON.stringify(updatedHistory));

    // Chuyển hướng tới trang chi tiết từ
    navigate(`/wordDetail?id=${word.id}&word=${word.word}`);
    
  };

  const handleDeleteHistory = (id) => {
    const updatedHistory = searchHistory.filter((item) => item !== id);
    setSearchHistory(updatedHistory);
    localStorage.setItem(key, JSON.stringify(updatedHistory));
  };

  const searchResult = words.filter((w) =>
    w.word.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setShowHistory(searchQuery.length === 0); // Hiện lịch sử tìm kiếm nếu không có từ khóa nào được nhập
  };

  const handleBlur = () => {
    // Thay đổi logic ở đây nếu cần thiết
    if (searchQuery.length === 0) {
      setTimeout(() => setShowHistory(false), 200); // Delay 200ms trước khi ẩn
    }
  };
  

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
          onFocus={handleFocus} // Thêm sự kiện onFocus
          onBlur={handleBlur} // Thêm sự kiện onBlur
        />

        <Button variant="outline-secondary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>

      {showHistory && searchHistory.length > 0 && (
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
          {searchHistory.map((id, index) => {
            const word = words.find((item) => item.id === id);
            return (
              word && (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  action
                  onClick={() => handleClickWord(word)}
                >
                  {word.word}
                  <span
                    className="btn btn-light"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện click vào từ kịch hoạt
                      handleDeleteHistory(id);
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </span>
                </ListGroup.Item>
              )
            );
          })}
        </ListGroup>
      )}

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
