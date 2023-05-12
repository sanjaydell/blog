import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SocialShare } from './SocialShare';


export const BlogCard = (props) => {
  const { post } = props;
  const { title, content, name } = post;
  return (
      <Card variant="outlined" width="80%" sx={{ marginBottom: '3rem' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" pb={2}>
            <Typography variant="h3" color="green">{title}</Typography>
            <Box display="flex" flexDirection="column">
            <Typography variant='h6' fontWeight="100">{name}</Typography>
            </Box>
          </Box>
          <Typography variant='h6' >{content}</Typography>
        </CardContent>
        <CardActions>
          <SocialShare title={title} content={content} />
        </CardActions>
      </Card>
  )
}
