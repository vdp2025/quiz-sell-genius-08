import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

const ResultPage2 = () => {
  const classes = useStyles();
  const location = useLocation();
  const { result } = location.state || {};

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Resultado
      </Typography>
      <Typography variant="h6" gutterBottom>
        {result}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => window.history.back()}
      >
        Voltar
      </Button>
    </Container>
  );
};

export default ResultPage2;