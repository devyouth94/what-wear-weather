import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const MotionSVG = styled(motion.svg)``;

export const MotionPathSecondary = styled(motion.path)`
  overflow: visible;
  stroke: ${({ theme }) => theme.colors.secondary_01};
  stroke-width: 0.5px;
`;

export const MotionPathPoint = styled(MotionPathSecondary)`
  stroke: ${({ theme }) => theme.colors.point_01};
`;
