import Container from '@mui/material/Container';

import Dashboard from 'src/module/dashboard/components/dashboard';

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Dashboard />
    </Container>
  );
}
