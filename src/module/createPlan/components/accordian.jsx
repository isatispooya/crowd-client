import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PropTypes from 'prop-types';

const AccordionCom = ({
  title,
  children,
  defaultExpanded = false,
  icon = null,
  tooltip = null,
  id,
  pastelBlue,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px !important',
        '&:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-root': {
          borderRadius: expanded ? '10px 10px 0 0' : '10px',
          backgroundColor: pastelBlue.light,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: pastelBlue.main,
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: pastelBlue.contrastText,
            display: 'flex',
            alignItems: 'center',
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: pastelBlue.dark,
              marginRight: '15px',
            },
          }}
        >
          {title}
          {tooltip && (
            <IconButton sx={{ ml: 1 }}>
              <HelpOutlineIcon />
            </IconButton>
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 3 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

AccordionCom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
  icon: PropTypes.node,
  tooltip: PropTypes.string,
  id: PropTypes.string.isRequired,
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccordionCom;
