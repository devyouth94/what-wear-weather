import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

export const MotionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
