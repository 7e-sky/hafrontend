import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from './actions'; // Assurez-vous que le chemin est correct
import { ClickAwayListener, Paper, Input, List, ListItem, ListItemText, Divider, Grid, Avatar } from '@material-ui/core';
import Highlighter from 'react-highlight-words'; // Assurez-vous d'installer ce package
import ContentLoader from 'react-content-loader'; // Assurez-vous d'installer ce package
import clsx from 'clsx';

function GlobalSearch(props) {
    const dispatch = useDispatch();
    const [onSearch, setOnSearch] = useState(false);
    const classes = useStyles(props);
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const ResultsNode = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (globalSearch.searchText.length > 1 && onSearch) {
            dispatch(Actions.showSearch());
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                dispatch(Actions.getResults(globalSearch.searchText));
            }, 300);
        } else {
            dispatch(Actions.hideSearch());
        }

        return () => clearTimeout(timerRef.current); // Nettoyez le timer à la destruction du composant
    }, [globalSearch.searchText, onSearch, dispatch]);

    function handleClickAway(event) {
        return (
            !ResultsNode.current ||
            !ResultsNode.current.contains(event.target)
        ) && (dispatch(Actions.hideSearch()), setOnSearch(false));
    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
    }

    return (
        <div ref={ResultsNode} className={clsx("mx-auto w-full max-w-640 border border-gray-600 rounded-lg", props.className)}>
            <Paper className="flex p-4 items-center w-full rounded-lg" elevation={1}>
                <Input
                    placeholder="Rechercher un produit, une activité, un fournisseur"
                    className="flex flex-1 h-44 focus:bg-gray"
                    disableUnderline
                    fullWidth
                    onChange={(event) => {
                        dispatch(Actions.setGlobalSearchText(event));
                        setOnSearch(true);
                    }}
                    onFocus={() => setOnSearch(true)}
                    autoFocus
                    value={globalSearch.searchText}
                    inputProps={{
                        'aria-label': 'Search'
                    }}
                />
            </Paper>

            {globalSearch.opened && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="mx-auto w-full z-999">
                        <Paper className="absolute shadow w-full z-9999" elevation={1}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={classes.cat}>
                                        Résultats
                                    </div>
                                    <List className={classes.root} dense={true}>
                                        {globalSearch.loadingProduits ? (
                                            <ContentLoader viewBox="0 0 400 100" height={100} width={400} speed={2}>
                                                <circle cx="150" cy="86" r="8" />
                                                <circle cx="194" cy="86" r="8" />
                                                <circle cx="238" cy="86" r="8" />
                                            </ContentLoader>
                                        ) : (
                                            <>
                                                {globalSearch.produits.length > 0 ? (
                                                    globalSearch.produits.map((produit, index) => (
                                                        <React.Fragment key={index}>
                                                            <ListItem
                                                                component={Link}
                                                                to={`/detail-produit/${produit.secteur ? produit.secteur.slug : ''}/${produit.sousSecteurs ? produit.sousSecteurs.slug : ''}/${produit.id}-${produit.slug}`}
                                                                dense={true}
                                                                onClick={() => { hideSearch(); setOnSearch(false); }}
                                                                button
                                                                alignItems="flex-start"
                                                            >
                                                                <Avatar alt={produit.titre} src={produit.featuredImageId ? URL_SITE + produit.featuredImageId.url : "assets/images/ecommerce/product-placeholder.jpg"} />
                                                                <ListItemText
                                                                    primary={
                                                                        <Highlighter
                                                                            highlightClassName="YourHighlightClass"
                                                                            searchWords={[globalSearch.searchText]}
                                                                            autoEscape={true}
                                                                            textToHighlight={produit.titre}
                                                                        />
                                                                    }
                                                                    secondary={produit.description && _.truncate(produit.description, { 'length': 50 })}
                                                                />
                                                                <ListItemSecondaryAction>
                                                                    {produit.pu && <span className="text-green">{produit.pu + ' ' + (produit.currency ? produit.currency.name : '') + ' HT'}</span>}
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                            <Divider variant="inset" component="li" />
                                                        </React.Fragment>
                                                    ))
                                                ) : (
                                                    <ListItem dense={true} alignItems="flex-start">
                                                        <ListItemText primary={"Aucun résultat trouvé pour « " + globalSearch.searchText + " »."} />
                                                    </ListItem>
                                                )}
                                            </>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </ClickAwayListener>
            )}
        </div>
    );
}

export default GlobalSearch;
