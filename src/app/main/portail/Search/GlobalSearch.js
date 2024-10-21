import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions/search.actions';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    maxHeight: '400px',
    overflowY: 'auto',
  },
  resultColumn: {
    padding: theme.spacing(1),
  },
  resultItem: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function GlobalSearch(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalSearch = useSelector(state => state.globalSearchApp?.globalSearch || {});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (globalSearch.searchText && globalSearch.searchText.length > 1) {
      dispatch(Actions.getResults(globalSearch.searchText));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [dispatch, globalSearch.searchText]);

  const handleInputChange = (e) => {
    dispatch(Actions.setSearchText(e.target.value));
  };

  return (
    <div className={props.className}>
      <input
        type="text"
        placeholder="Rechercher..."
        value={globalSearch.searchText || ''}
        onChange={handleInputChange}
      />
      {showResults && (
        <Paper className={classes.searchResults}>
          <Grid container spacing={2}>
            <Grid item xs={4} className={classes.resultColumn}>
              <Typography variant="h6">Produits/services</Typography>
              {globalSearch.produits.map((produit, index) => (
                <div key={index} className={classes.resultItem}>{produit.titre}</div>
              ))}
            </Grid>
            <Grid item xs={4} className={classes.resultColumn}>
              <Typography variant="h6">Activités</Typography>
              {globalSearch.activites.map((activite, index) => (
                <div key={index} className={classes.resultItem}>{activite.name}</div>
              ))}
            </Grid>
            <Grid item xs={4} className={classes.resultColumn}>
              <Typography variant="h6">Fournisseurs</Typography>
              {globalSearch.fournisseurs.map((fournisseur, index) => (
                <div key={index} className={classes.resultItem}>{fournisseur.societe}</div>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

export default GlobalSearch;
