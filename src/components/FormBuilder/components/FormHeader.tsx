import { Box, Typography } from '@mui/material';
import theme from '../../../theme';
import { FormHeaderProps } from '../types';

export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <Box sx={{ backgroundColor: theme.palette.primary['50'], py: 2 }}>
      <Box sx={{ maxWidth: 'md', mx: 'auto', px: 2 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant='body1' color='text.secondary'>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
