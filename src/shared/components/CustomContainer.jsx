import PropTypes from 'prop-types';

const CustomContainer = ({ children }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
      {children}
    </div>
  )
}

CustomContainer.propTypes = {
    children: PropTypes.node.isRequired
}

export default CustomContainer