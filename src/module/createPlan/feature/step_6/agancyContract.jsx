import { Box, Typography } from '@mui/material';
import { HiDocument, HiChevronLeft } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useGetCompany } from '../../hooks';

const AgancyContract = ({ readOnly }) => {
  const { id } = useParams();
  const { data: companyData } = useGetCompany(id);
  const uuid = companyData?.investor_request?.uuid || '';

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: readOnly ? 1 : 1.03,
      boxShadow: readOnly ? 'none' : '0px 8px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.2,
      },
    },
  };
  const links = [
    {
      id: 1,
      title: 'قرارداد عاملیت',
      path: uuid ? `/agencyContract/?uuid=${uuid}` : '#',
      icon: '📄',
    },
    { id: 2, title: 'نامه بانکی', path: uuid ? `/bankLetter/?uuid=${uuid}` : '#', icon: '📑' },
  ];

  return (
    <div>
      {' '}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2.5,
            pb: 1.5,
            borderBottom: '1px solid #eee',
          }}
        >
          <Box
            sx={{
              bgcolor: pastelBlue.light,
              color: pastelBlue.dark,
              p: 1,
              borderRadius: '50%',
              mr: 1,
            }}
          >
            <HiDocument style={{ width: 20, height: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
            انواع قرارداد
          </Typography>
        </Box>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {links.map((link) => (
            <motion.div key={link.id} variants={itemVariants} whileHover="hover">
              <Link
                to={readOnly || link.path === '#' ? '#' : link.path}
                onClick={(e) => (readOnly || link.path === '#') && e.preventDefault()}
                style={{
                  display: 'block',
                  padding: '16px',
                  marginBottom: '16px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s',
                  opacity: readOnly || link.path === '#' ? 0.8 : 1,
                  cursor: readOnly || link.path === '#' ? 'default' : 'pointer',
                  textDecoration: 'none',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '1.5rem', mr: 1.5 }}>{link.icon}</Typography>
                    <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                      {link.title}
                    </Typography>
                  </Box>
                  {!readOnly && link.path !== '#' && (
                    <Box
                      sx={{
                        bgcolor: pastelBlue.light,
                        color: pastelBlue.dark,
                        p: 0.5,
                        borderRadius: '50%',
                      }}
                    >
                      <HiChevronLeft style={{ width: 20, height: 20 }} />
                    </Box>
                  )}
                </Box>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </div>
  );
};

AgancyContract.propTypes = {
  readOnly: PropTypes.bool,
};

AgancyContract.defaultProps = {
  readOnly: false,
};

export default AgancyContract;
