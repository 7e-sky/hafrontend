import React, { useRef, useEffect } from 'react';
import { Popper, ClickAwayListener, MenuItem, Icon, IconButton, ListItemText, Paper, TextField, Tooltip, Typography, ListItemSecondaryAction, Avatar, ListItemAvatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Autosuggest from 'react-autosuggest';
import reducer from './store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Highlighter from "react-highlight-words";
import history from '@history';
import FuseUtils from '@fuse/FuseUtils';

const useStyles = makeStyles(theme => ({
    root: {},
    container: {
        position: 'relative'
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0
    },
    suggestion: {
        display: 'block'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    },
    input: {
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short
        }),
        '&:focus': {
            backgroundColor: theme.palette.background.paper
        }
    },
    suggestionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: theme.spacing(2),
        maxWidth: '1400px', // Augmenter la largeur maximale
        margin: '0 auto', // Centrer le conteneur
    },
    suggestionSection: {
        flex: '1 1 25%',
        maxWidth: '25%',
        padding: theme.spacing(1),
        '& > div': {
            maxHeight: '400px',
            overflowY: 'auto',
        },
    },
    sectionTitle: {
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.grey[200],
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
    },
    suggestion: {
        padding: theme.spacing(1, 2),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    actualiteItem: {
        '& .MuiAvatar-root': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    mainPaper: {
        backgroundColor: theme.palette.background.default,
        borderRadius: 8,
        overflow: 'hidden',
        padding: theme.spacing(3)
    },
    searchResults: {
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[400],
            borderRadius: '3px',
        }
    },
    sectionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing(4), // Augmentation de l'espace entre les sections
        padding: theme.spacing(1),
        minHeight: 300,
    },
    sectionWrapper: {
        flex: '1 1 0', // Distribution égale de l'espace
        minWidth: '250px', // Largeur minimale
        maxWidth: '350px', // Largeur maximale
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            boxShadow: theme.shadows[4],
            transform: 'translateY(-2px)'
        }
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    sectionIcon: {
        marginRight: theme.spacing(1.5),
        fontSize: 22,
    },
    sectionTitle: {
        fontWeight: 500,
        fontSize: '1rem',
        letterSpacing: '0.5px'
    },
    sectionContent: {
        flex: 1,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
        minHeight: 200,
        maxHeight: 400,
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[300],
            borderRadius: '2px',
        }
    },
    noResultsContainer: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80
    },
    noResultsText: {
        color: theme.palette.text.secondary,
        fontSize: '0.875rem'
    },
}));

function renderSectionTitle(section, classes) {
    if (section.suggestions.length === 0) {
        return null;
    }
    const icon = section.title === '12Actualités' ? 'article' : 
                 section.title === 'Produits' ? 'shopping_cart' :
                 section.title === 'Fournisseurs' ? 'business' : 'category';
    
    return (
        <Typography variant="subtitle1" className={classes.sectionTitle}>
            <Icon className="mr-8">{icon}</Icon>
            {section.title}
        </Typography>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }, classes) {
    console.log('Suggestion:', suggestion);
    
    let result = '';
    let img = null;
    
    if (suggestion.societe) {
        result = suggestion.societe;
        img = <Avatar>{suggestion.societe[0]}</Avatar>;
    }
    else if (suggestion.titre) {
        result = suggestion.titre;
        if (suggestion.type === 'actualite') {
            img = suggestion.image 
                ? <Avatar 
                    alt={suggestion.titre} 
                    src={suggestion.image} 
                    imgProps={{
                        onError: (e) => {
                            console.error('Image error:', e);
                            e.target.src = 'assets/images/ecommerce/product-placeholder.jpg';
                        }
                    }}
                  />
                : <Avatar><Icon>article</Icon></Avatar>;
        } else {
            img = suggestion.featuredImageId
                ? <Avatar alt={suggestion.titre} src={suggestion.featuredImageId.url} />
                : <Avatar alt={suggestion.titre} src="assets/images/ecommerce/product-placeholder.jpg" />;
        }
    }
    else if (suggestion.name) {
        result = suggestion.name;
        img = <Avatar>{suggestion.name[0]}</Avatar>;
    }
    else if (suggestion.autreFrs) {
        result = suggestion.autreFrs;
    }
    else if (suggestion.autreProduits) {
        result = suggestion.autreProduits;
    }
    else if (suggestion.autreActivites) {
        result = suggestion.autreActivites;
    }
    else if (suggestion.autreActualites) {
        result = suggestion.autreActualites;
    }

    return (
        <div className={classes.suggestion}>
            <Grid container alignItems="center" spacing={2}>
                {img && (
                    <Grid item>
                        {img}
                    </Grid>
                )}
                <Grid item xs>
                    <Typography>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[query]}
                            autoEscape={true}
                            textToHighlight={result}
                        />
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton size="small">
                        <Icon fontSize="small">chevron_right</Icon>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

function getSuggestionValue(suggestion) {
    if (suggestion.societe) return suggestion.societe;
    if (suggestion.titre) return suggestion.titre;
    if (suggestion.name) return suggestion.name;
    if (suggestion.autreFrs) return suggestion.autreFrs;
    if (suggestion.autreProduits) return suggestion.autreProduits;
    if (suggestion.autreActivites) return suggestion.autreActivites;
    if (suggestion.autreActualites) return suggestion.autreActualites;
    return '';
}

function getSectionSuggestions(section) {
    return section.suggestions;
}

function Search(props) {
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const classes = useStyles();
    const suggestionsNode = useRef(null);
    const popperNode = useRef(null);
    const dispatch = useDispatch();

    function showSearch() {
        dispatch(Actions.showSearch());
        document.addEventListener("keydown", escFunction, false);
    }

    function hideSearch() {
        dispatch(Actions.hideSearch());
        document.removeEventListener("keydown", escFunction, false);
    }

    function escFunction(event) {
        if (event.keyCode === 27) {
            hideSearch();
        }
        if (event.keyCode === 13) {
            event.target.value && history.push(`/vente-produits?q=${event.target.value}`);
        }
    }

    function handleSuggestionsFetchRequested({ value }) {
        if (value.trim().length > 1) {
            dispatch(Actions.loadSuggestions(value.trim()));
        }
    }

    function handleSuggestionSelected(event, { suggestion }) {
        event.preventDefault();
        event.stopPropagation();
        let url;
        
        if (!suggestion) return;

        if (suggestion.societe) {
            url = `/entreprise/${suggestion.id}-${suggestion.slug}`;
        }
        else if (suggestion.titre) {
            url = `/actualite/${suggestion.id}-${suggestion.slug}`;
        }
        else if (suggestion.name) {
            url = `/vente-produits/${suggestion.sect}/${suggestion.slug}`;
        }
        else if (suggestion.autreFrs) {
            url = `/entreprises?q=${suggestion.value}`;
        }
        else if (suggestion.autreProduits) {
            url = `/vente-produits?q=${suggestion.value}`;
        }
        else if (suggestion.autreActivites) {
            url = `/vente-produits?activite=${suggestion.value}`;
        }
        else if (suggestion.autreActualites) {
            url = `/actualites?q=${suggestion.value}`;
        }
        
        history.push(url);
        hideSearch();
    }

    function handleSuggestionsClearRequested() {
        dispatch(Actions.clearSuggestions());
    }

    function handleChange(event, { newValue }) {
        dispatch(Actions.setSearchText(newValue));
    }

    function handleClickAway(event) {
        return !suggestionsNode.current || !suggestionsNode.current.contains(event.target) && hideSearch();
    }

    function renderInputComponent(inputProps) {
        const {
            variant,
            classes, inputRef = () => {
            }, ref, ...other
        } = inputProps;
        return (
            <div className="w-full relative">
                {variant === "basic" ? (
                    // Outlined
                    <React.Fragment>
                        <TextField
                            fullWidth
                            InputProps={{
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: clsx(classes.input, "py-0 px-16 h-48 pr-48"),
                                    notchedOutline: "rounded-8"
                                }
                            }}
                            variant="outlined"
                            {...other}
                        />
                        {globalSearch.loading ? (
                            <CircularProgress color="secondary" className="absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none" />
                        )
                            :
                            <Icon className="absolute top-0 right-0 h-48 w-48 p-12 pointer-events-none" color="action">search</Icon>
                        }
                    </React.Fragment>
                )
                    :
                    (
                        // Standard
                        <TextField
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: clsx(classes.input, "py-0 px-16 h-64")
                                }
                            }}
                            variant="standard"
                            {...other}
                        />
                    )}
            </div>
        );
    }
    const renderSuggestionsContainer = ({ containerProps, children }) => {
        const childrenArray = Array.isArray(children) ? children : [children];

        // Vérifier s'il y a des résultats
        const hasResults = childrenArray.some(content => content);

        // Si aucun résultat et qu'une recherche est en cours
        if (!hasResults && globalSearch.searchText && !globalSearch.loading) {
            return (
                <Popper
                    anchorEl={popperNode.current}
                    open={true}
                    popperOptions={{ positionFixed: true }}
                    className="z-9999"
                    style={{ 
                        width: '100%',
                        maxWidth: '350px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        margin: '0 auto'
                    }}
                >
                    <Paper elevation={3} square {...containerProps} className={classes.mainPaper}>
                        <div className={classes.noResultsContainer}>
                            <Typography variant="body1" className={classes.noResultsText}>
                                Aucun résultat trouvé
                            </Typography>
                        </div>
                    </Paper>
                </Popper>
            );
        }

        // Le reste du code existant pour l'affichage des résultats
        const activeSections = [
            childrenArray[0],
            childrenArray[1],
            childrenArray[2],
            childrenArray[3]
        ].filter(content => content).length;

        // Calculer la largeur maximale en fonction du nombre de sections
        const getMaxWidth = (count) => {
            switch(count) {
                case 1: return '350px';   // Une seule section
                case 2: return '700px';   // Deux sections
                case 3: return '1050px';  // Trois sections
                default: return '1400px'; // Quatre sections
            }
        };

        const sections = [
            { title: 'Fournisseurs', content: childrenArray[0] },
            { title: 'Produits', content: childrenArray[1] },
            { title: 'Activités', content: childrenArray[2] },
            { title: 'Actualités', content: childrenArray[3] }
        ];

        return (
            <Popper
                anchorEl={popperNode.current}
                open={Boolean(children) || globalSearch.noSuggestions || globalSearch.loading}
                popperOptions={{ positionFixed: true }}
                className="z-9999"
                style={{ 
                    width: '100%',
                    maxWidth: getMaxWidth(activeSections),
                    left: '50%',
                    transform: 'translateX(-50%)',
                    margin: '0 auto'
                }}
            >
                <Paper elevation={3} square {...containerProps} className={classes.mainPaper}>
                    <div className={classes.searchResults}>
                        <Grid 
                            container 
                            spacing={2}  // Réduit l'espacement entre les sections
                            className={classes.sectionsContainer}
                            justifyContent="center"
                        >
                            {sections.map((section, index) => (
                                section.content && (
                                    <Grid 
                                        item 
                                        style={{ width: '320px' }}  // Largeur fixe pour chaque section
                                        key={index}
                                    >
                                        <div className={classes.sectionWrapper}>
                                            <div className={classes.sectionContent}>
                                                {section.content}
                                            </div>
                                        </div>
                                    </Grid>
                                )
                            ))}
                        </Grid>
                    </div>
                </Paper>
            </Popper>
        );
    };
   
    const autosuggestProps = {
        renderInputComponent,
        highlightFirstSuggestion: true,
        multiSection: true,
        suggestions: globalSearch.suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        onSuggestionSelected: handleSuggestionSelected,
        renderSectionTitle: (section) => renderSectionTitle(section, classes),
        getSectionSuggestions: getSectionSuggestions,
        getSuggestionValue,
        renderSuggestion: (suggestion, params) => renderSuggestion(suggestion, params, classes),
        renderSuggestionsContainer: renderSuggestionsContainer,
    };

    useEffect(() => {
        const hasResults = globalSearch.suggestions.length > 0 || globalSearch.noSuggestions;
        console.log('Calling onResultsVisibilityChange with:', hasResults);
        
        if (typeof props.onResultsVisibilityChange === 'function') {
            props.onResultsVisibilityChange(hasResults);
        } else {
            console.error('onResultsVisibilityChange is not a function');
        }
    }, [globalSearch.suggestions, globalSearch.noSuggestions]);
    
    switch (props.variant) {
        case 'basic':
            {
                return (
                    <div className={clsx("flex items-center w-full", props.className)} ref={popperNode}>
                        <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                                variant: props.variant,
                                classes,
                                placeholder: 'Rechercher un produit, une activité, un fournisseur',
                                value: globalSearch.searchText || '',
                                onChange: handleChange,
                                onFocus: showSearch,
                                InputLabelProps: {
                                    shrink: true
                                },
                                autoFocus: false
                            }}
                            theme={{
                                container: "flex flex-1 w-full",
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion
                            }}
                        />
                    </div>
                )
            }
        case 'full':
            {
                return (
                    <div className={clsx(classes.root, "flex", props.className)}>
                        <Tooltip title="Click to search" placement="bottom">
                            <div onClick={showSearch}>
                                {props.trigger}
                            </div>
                        </Tooltip>
                        {globalSearch.opened && (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <Paper
                                    className="absolute left-0 right-0 h-full z-9999"
                                    square={true}
                                >
                                    <div className="flex items-center w-full" ref={popperNode}>
                                        <Autosuggest
                                            {...autosuggestProps}
                                            inputProps={{
                                                classes,
                                                placeholder: 'Rechercher un produit, une activité, un fournisseur',
                                                value: globalSearch.searchText || '',
                                                onChange: handleChange,
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                autoFocus: true
                                            }}
                                            theme={{
                                                container: "flex flex-1 w-full",
                                                suggestionsList: classes.suggestionsList,
                                                suggestion: classes.suggestion
                                            }}
                                        />
                                        <IconButton onClick={hideSearch} className="mx-8">
                                            <Icon>close</Icon>
                                        </IconButton>
                                    </div>
                                </Paper>
                            </ClickAwayListener>
                        )}
                    </div>
                )
            }
        default:
            {
                return null;
            }
    }
}

Search.propTypes = {};
Search.defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>),
    variant: 'full'
};

export default withReducer('globalSearchApp', reducer)(Search);
