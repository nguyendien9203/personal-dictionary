import { Dropdown, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const FilterDropdown = ({ wordTypes, filterWordTypes, setFilterWordTypes }) => {
  
  // Xử lý khi một checkbox được chọn hoặc bỏ chọn
  const handleWordTypeFilterChange = (typeId) => {
    setFilterWordTypes((prevFilterWordTypes) => {
      if (prevFilterWordTypes.includes(typeId)) {
        return prevFilterWordTypes.filter((id) => id !== typeId);
      } else {
        return [...prevFilterWordTypes, typeId];
      }
    });
  };

  // Xóa bộ lọc
  const handleClearFilter = () => {
    setFilterWordTypes(wordTypes.map(wt => wt.id.toString()));
  };


  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <i className="bi bi-funnel"></i> Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <Button
            variant="link"
            onClick={handleClearFilter}
            style={{
              padding: '0',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <i className="bi bi-x-lg"></i> Clear
          </Button>
        </Dropdown.Item>
        <Dropdown.Divider />
        {wordTypes.map((wt) => (
          <Dropdown.Item as="div" key={wt.id}>
            <Form.Check
              type="checkbox"
              label={wt.type}
              value={wt.id}
              checked={filterWordTypes.includes(wt.id.toString())}
              onChange={(e) => handleWordTypeFilterChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

FilterDropdown.propTypes = {
  wordTypes: PropTypes.array.isRequired,
  filterWordTypes: PropTypes.array.isRequired,
  setFilterWordTypes: PropTypes.func.isRequired,
};

export default FilterDropdown;
