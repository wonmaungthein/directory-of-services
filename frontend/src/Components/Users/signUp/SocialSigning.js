import React from 'react';
import Button from 'material-ui/Button';

const SocialSigning = props => (
  <Button variant="raised" className={props.social === 'Google+'? 'Google': props.social}>
    Log in with  {props.social}
  </Button>
);

export default SocialSigning;
