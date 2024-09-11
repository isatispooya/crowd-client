/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  Drawer,
  IconButton,
  ListItemButton,
  Grid,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Scrollbar from 'src/components/scrollbar';
import { getCookie, setCookie } from 'src/api/cookie';
import SvgColor from 'src/components/svg-color';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import navConfig from './config-navigation';
import { NAV } from './config-layout';

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const access = getCookie('access');

  const handleLogout = useCallback(() => {
    setCookie('access', '', { expires: new Date(0) });
    navigate('/login');
  }, [navigate]);

  const getProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${OnRun}/api/information/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, [access]);

  useEffect(() => {
    if (access && !profileData) {
      getProfile();
    }
  }, [access, getProfile, profileData]);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, onCloseNav, openNav]);

  const renderAccount = (
    <Box sx={{ p: 3, textAlign: 'center', marginBottom : 5 }}>
      <Box
        component="img"
        src="/assets/crowdlogo.png"
        alt="Logo"
        sx={{
          width: 150,
          height: 150,
          mx: 'auto',
          mb: 2,
        }}
      />
      <Box sx={{ bgcolor: 'white', color: 'black', p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Grid item xs={12}>
          {profileData?.acc?.private_person?.length > 0 ? (
            <Box display="flex" justifyContent="center">
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {profileData.acc.private_person[0].firstName}
              </Typography>
              <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                {profileData.acc.private_person[0].lastName}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6">در حال بارگذاری...</Typography>
          )}
          <Typography variant="body1" sx={{ mt: 1 }}>
            خوش آمدید 👋
          </Typography>
        </Grid>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2, color: 'black' }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
      <ListItemButton
        onClick={handleLogout}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'red',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            color: (theme) => theme.palette.error.main,
          },
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <SvgColor
            src="/assets/icons/navbar/ic_exit.svg"
            sx={{ width: 1, height: 1, color: 'red' }}
          />
        </Box>
        <Box component="span">خروج</Box>
      </ListItemButton>
    </Stack>
  );

  const renderContent = (
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
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        bgcolor: 'gray.200',
        borderRadius: 2,
        position: 'relative',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            bgcolor: 'gray.200',
            color: 'black',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1201,
              padding: 1,
              borderRadius: '50%',
              '& .MuiSvgIcon-root': {
                fontSize: 36,
                color: 'text.primary',
              },
              bgcolor: 'white',
              '&:hover': {
                bgcolor: 'gray.300',
              },
            }}
          >
            {mobileMenuOpen ? (
              <CloseIcon sx={{ color: 'black' }} />
            ) : (
              <MenuIcon sx={{ color: 'black' }} />
            )}
          </IconButton>

          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
                bgcolor: 'gray.200',
                color: 'black',
                // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                position: 'relative',
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                boxShadow: 4,
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1202,
              }}
            >
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  padding: 1,
                  borderRadius: '50%',
                  boxShadow: 3,
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: 'gray.300',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 36,
                    color: 'black',
                  },
                }}
              />
            </Box>
            {renderContent}
          </Drawer>
        </>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: active ? 'primary.main' : 'black',
        textTransform: 'capitalize',
        fontWeight: active ? 'bold' : 'medium',
        bgcolor: active ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          color: active ? 'primary.main' : 'black',
        },
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Typography component="span">{item.title}</Typography>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};
