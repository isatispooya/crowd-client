import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const InfoItem = ({ label, value, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex items-start gap-2 ${className || ''}`}
  >
    <span className="min-w-[100px] text-sm font-medium text-gray-600">{label}:</span>
    <span className="text-sm text-gray-800">{value || 'نامشخص'}</span>
  </motion.div>
);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default InfoItem;
