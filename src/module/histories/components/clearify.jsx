import PropTypes from 'prop-types';
import HistoryList from './historyList';

const History = ({ cardSelected }) => {

  return <HistoryList cardSelected={cardSelected} />;
};

History.propTypes = {
  cardSelected: PropTypes.number.isRequired,
};
export default History;
