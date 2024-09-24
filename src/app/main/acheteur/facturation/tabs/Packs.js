import React, { useEffect /*, useState*/ } from "react";
import {
  Button,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green, red } from "@material-ui/core/colors";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_CURRENCY } from "@fuse";

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  price: {
    backgroundColor: theme.palette.primary[600],
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ddd",
  },
  populaire: {
    "&:before": {
      content: "ddddddd",
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  //  dialogPaper: { overflow: 'visible' }
}));

function Packs(props) {
  const classes = useStyles();
  const { currency } = props;
  const dispatch = useDispatch();
  const commande = useSelector(({ facturationApp }) => facturationApp.commande);

  useEffect(() => {
    dispatch(Actions.getOffres());
  }, [dispatch]);

  if (commande.loadingOffres) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <CircularProgress color="secondary" /> &ensp; Chargement ...
      </div>
    );
  }
  function handleSelectOffre(item) {
    dispatch(Actions.openNewCommandeDialog(item));
  }

  return (
    <div>
      <div className="p-24 ">
        <div className="w-full max-w-2xl mx-auto">
          <Grid container>
            <Grid item xs={6} sm={6} md={4} container>
              <Grid item xs={12} className="h-160"></Grid>
              <Grid item xs={12}>
              <List className={classes.root}>
                    <ListItem classes={{ root: "h-60 sm:h-56 " }}>
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Publication des demandes de devis ( RFQ )"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Réception des devis"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir les profils des Fournisseurs"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56" }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir les catalogues des Fournisseurs"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir le nombre de Fournisseurs Intéressés * "
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Compte anonyme **"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Voir le nombre de diffusions de la ( RFQ )"
                      />
                    </ListItem>

                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Directeur des achats "
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Blackliste"
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem
                      classes={{ root: "h-60 sm:h-56 " }}
                      alignItems="flex-start"
                    >
                      <ListItemText
                        classes={{
                          primary:
                            "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                        }}
                        primary="Suggestion"
                      />
                    </ListItem>
                  </List>
                <Grid item xs={12} className="h-160"></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={6} md={8} container spacing={1}>
              {
                // FREE
              }
              <Grid item xs={12} sm={6} md={3} container>
                <Grid
                  item
                  xs={12}
                  style={{
                    background:
                      "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                    borderRadius: "20px 20px 0 0",
                    border: "1px solid #ddd",
                  }}
                  className="text-center h-160 "
                >
                  <div className="text-black uppercase font-extrabold pt-16 text-24">
                    FREE
                  </div>
                  <div className="flex justify-center mt-12 text-black">
                    <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                      {currency === LOCAL_CURRENCY ? LOCAL_CURRENCY : "$"}
                    </span>
                    <span className=" uppercase font-extrabold text-32">
                      00<span className="text-10">,00</span>
                    </span>
                  </div>
                </Grid>
                
                <Grid item xs={12}>
                <List className={classes.root}>
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          justify="center"
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter)"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter)"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                    </List>
                  <Grid
                  item
                  xs={12}
                  style={{
                    background:
                      "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                    borderRadius: "20px 20px 0 0",
                    border: "1px solid #ddd",
                  }}
                  className="text-center h-160 "
                >
                  <div className="text-black uppercase font-extrabold pt-16 text-24">
                    FREE
                  </div>
                  <div className="flex justify-center mt-12 text-black">
                    <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                      {currency === LOCAL_CURRENCY ? LOCAL_CURRENCY : "$"}
                    </span>
                    <span className=" uppercase font-extrabold text-32">
                      00<span className="text-10">,00</span>
                    </span>
                  </div>
                </Grid>
                </Grid>
               
              </Grid>
              {
                // FIN FREE
              }
              {
                // PACKs PAYANT
                commande.offres &&
                  commande.offres.map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={item.id}
                      className="flex hidden sm:block md:block lg:block "
                    >
                      <Grid
                        item
                        xs={12}
                        style={{
                          background:
                            "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                          borderRadius: "20px 20px 0 0",
                          border: "1px solid #ddd",
                        }}
                        className="text-center h-160 "
                      >
                        <div className="text-green uppercase font-extrabold pt-16 text-16">
                          {item.name}
                        </div>
                        <div className="flex justify-center mt-12 text-green">
                          <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                            {currency === LOCAL_CURRENCY ? LOCAL_CURRENCY : "$"}
                          </span>
                          <span className=" uppercase font-extrabold text-32 md:text-24">
                            {currency === LOCAL_CURRENCY
                              ? item.prixMad
                              : item.prixEur}
                            <span className="text-10">
                              ,00 / mois
                              {currency === LOCAL_CURRENCY && " HT"}
                            </span>
                          </span>
                        </div>
                        <div className="mt-6">
                          <Button
                            variant="contained"
                            onClick={() => handleSelectOffre(item)}
                            color="secondary"
                          >
                            {" "}
                            sélectionner
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                      <List className={classes.root}>
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          justify="center"
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary="illimité"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15 ",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: green[500] }}>
                              check_circle
                            </Icon>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem classes={{ root: "h-60 sm:h-56 text-center" }}>
                        <ListItemText
                          classes={{
                            primary:
                              "font-bold text-10 sm:text-12 md:text-14 lg:text-15",
                          }}
                          primary={
                            <Icon style={{ color: red[500] }}>close</Icon>
                          }
                          secondary="( Nous contacter )"
                        />
                      </ListItem>
                    </List>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          background:
                            "linear-gradient(to top left, #ddd 10%, #ddd 30%, #fff 60%, #fff 60%)",
                          borderRadius: "20px 20px 0 0",
                          border: "1px solid #ddd",
                        }}
                        className="text-center h-160 "
                      >
                        <div className="text-green uppercase font-extrabold pt-16 text-16">
                          {item.name}
                        </div>
                        <div className="flex justify-center mt-12 text-green">
                          <span className=" uppercase text-10 sm:text-12 md:text-14 lg:text-15">
                            {currency === LOCAL_CURRENCY ? LOCAL_CURRENCY : "$"}
                          </span>
                          <span className=" uppercase font-extrabold text-32 md:text-24">
                            {currency === LOCAL_CURRENCY
                              ? item.prixMad
                              : item.prixEur}
                            <span className="text-10">
                              ,00 / mois
                              {currency === LOCAL_CURRENCY && " HT"}
                            </span>
                          </span>
                        </div>
                        <div className="mt-6">
                          <Button
                            variant="contained"
                            onClick={() => handleSelectOffre(item)}
                            color="secondary"
                          >
                            {" "}
                            sélectionner
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  ))
              }
              
            </Grid>
          </Grid>
          
        </div>
      </div>
    </div>
    
  );
}

export default Packs;