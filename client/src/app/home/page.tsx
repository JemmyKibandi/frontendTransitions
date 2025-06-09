'use client';

import * as React from 'react';
import Skeleton from '@/components/page'; // Adjust path if needed
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from '@toolpad/core/PageContainer';
import { createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';

const NAVIGATION: Navigation = [
  { segment: 'inbox', title: 'Inbox' },
  {
    segment: 'inbox/all',
    title: 'All',
    icon: <DashboardIcon />,
  },
];

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>
    <Stack direction="row" spacing={2}>
      <Avatar
        sx={{
          transition: '0.3s',
          '&:hover': {
            backgroundColor: 'primary.main',
            transform: 'scale(1.1)',
            cursor: 'pointer',
          },
        }}
      >
        <FolderIcon />
      </Avatar>
  
      <Avatar
        sx={{
          bgcolor: pink[500],
          transition: '0.3s',
          '&:hover': {
            bgcolor: pink[700],
            transform: 'scale(1.1)',
            cursor: 'pointer',
          },
        }}
      >
        <PageviewIcon />
      </Avatar>
  
      <Avatar
        sx={{
          bgcolor: green[500],
          transition: '0.3s',
          '&:hover': {
            bgcolor: green[700],
            transform: 'scale(1.1)',
            cursor: 'pointer',
          },
        }}
      />
    </Stack>
  </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
});

export default function PageContainerBasic(props: any) {
  const { window } = props;
  const router = useDemoRouter('/inbox/all');
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        title: 'ACME Inc.'
      }}
    >
      <Paper sx={{ p: 2, width: '100%' }}>
        <PageContainer
          slots={{
            header: CustomPageHeader,
          }}
        >
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
