import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(0, 1),
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(1),
  },
}));

const SmallMemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(0.5),
  borderRadius: 8,
  border: '1px solid #f0f0f0',
  boxShadow: 'none',
  transition: 'box-shadow 0.2s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'calc(25% - 16px)',
  minWidth: '110px',
  height: '160px',
  '&:hover': {
    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
  },
}));

const BoardMembersSection = ({ members }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <StyledAccordion
        expanded={expanded === 'members'}
        onChange={handleAccordionChange('members')}
        sx={{
          bgcolor: 'transparent',
          border: '1px solid #eaeaea',
          borderRadius: '8px',
          mb: 2,
          '&:hover': {
            borderColor: (theme) => theme.palette.primary.light,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="members-content"
          id="members-header"
          sx={{
            borderBottom: expanded === 'members' ? '1px solid #f0f0f0' : 'none',
            '&:hover': { bgcolor: '#f9f9f9' },
            py: 0.5,
          }}
        >
          <Typography color="#1A365D" fontWeight={500} sx={{ fontSize: '1.1rem' }}>
            اعضای هیئت مدیره
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: '8px',
              maxHeight: '350px',
              overflowY: 'auto',
              pr: 1,
              mx: -0.5,
            }}
          >
            {members?.map((member, index) => (
              <SmallMemberCard key={index}>
                <Avatar
                  src={member.picture_url}
                  alt={member.person_title}
                  sx={{ width: 45, height: 45, mb: 1 }}
                />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  align="center"
                  sx={{
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    height: '40px',
                    width: '100%',
                    px: 0.5,
                  }}
                >
                  {member.person_title}
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  align="center"
                  sx={{
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    width: '100%',
                  }}
                >
                  {member.position_title}
                </Typography>
              </SmallMemberCard>
            ))}
          </Box>
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
};

BoardMembersSection.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      person_title: PropTypes.string,
      position_title: PropTypes.string,
      picture_url: PropTypes.string,
    })
  ).isRequired,
};

export default BoardMembersSection;
