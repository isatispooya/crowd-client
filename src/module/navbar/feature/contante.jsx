
import Profile from 'src/module/navbar/feature/profile';
import Menu from 'src/module/navbar/feature/menu';
import { Box } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';

const Contant = () => (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Profile />
      <Menu />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

export default Contant;
