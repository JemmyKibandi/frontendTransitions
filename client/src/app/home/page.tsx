'use client';
import type { Router as ToolpadRouter } from '@toolpad/core/AppProvider';
import * as React from 'react';
import { motion } from "motion/react"
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
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';

import LoadingThreeDotsPulse from '@/components/LoadingThreeDotsPulse'; // import your loader component

interface MyRouter extends ToolpadRouter {
  loading: boolean;
}
const NAVIGATION: Navigation = [
  { segment: 'inbox', title: 'Inbox' },
  {
    segment: 'inbox/all',
    title: 'All',
    icon: <DashboardIcon />,
  },
];

function useDemoRouter(initialPath: string): MyRouter {
  const [pathname, setPathname] = React.useState(initialPath);
  const [loading, setLoading] = React.useState(false);

  const router: MyRouter = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => {
      setLoading(true);
      // Simulate loading delay (replace with actual navigation logic)
      setTimeout(() => {
        setPathname(String(path));
        setLoading(false);
      }, 500); 
    },
    loading,
  }), [pathname, loading]);

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
          {/* Show loader if navigating */}
          {router.loading ? (
            <div
              style={{
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LoadingThreeDotsPulse />
            </div>
          ) : (
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
          )}
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
