// src/components/SkeletonBox.tsx
'use client';

import { styled } from '@mui/material/styles';

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: (theme.vars || theme).palette.action.hover,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  height,
}));

export default Skeleton;
