import { RouterLink } from 'src/routes/components';
import { alpha, Box, ListItemButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { usePathname } from 'src/routes/hooks';
import { motion } from 'framer-motion';

export default function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ListItemButton
        component={RouterLink}
        href={item.path}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: active ? '#295270' : '#295270',
          textTransform: 'capitalize',
          fontWeight: active ? 'bold' : 'medium',
          bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
            color: '#295270',
          },
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {item.icon}
          </Box>
          <Typography component="span">{item.title}</Typography>
        </motion.div>
      </ListItemButton>
    </motion.div>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};
