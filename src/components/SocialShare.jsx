import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

export const SocialShare = (props) => {
  const { title, content } = props;
  const displayQuote = title + "\n" + content;

  return (
    <Box display="flex" flexDirection="row" pl={1} paddingTop={0}>
      <Box pr={1}>
      <FacebookShareButton url="#" quote={displayQuote}>
        <FacebookIcon round={true} size={34}/>
      </FacebookShareButton>
      </Box>
      <TwitterShareButton url="#" quote={displayQuote}>
        <TwitterIcon round={true} size={34}/>
      </TwitterShareButton>
    </Box>
  );
};
