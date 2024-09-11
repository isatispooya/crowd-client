import UseCartId from 'src/hooks/use-cartId';
import PropTypes from 'prop-types';
import Attachement from '../feuture/attachement';

const ResumePage = ({ handleNext }) => {
  const { cartId } = UseCartId();

  console.log();

  return <Attachement handleNext={handleNext} cartId={cartId} />;
};

ResumePage.propTypes = {
  handleNext: PropTypes.func.isRequired,
};

export default ResumePage;
