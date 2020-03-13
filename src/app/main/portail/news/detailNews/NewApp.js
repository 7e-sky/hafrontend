import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid } from '@material-ui/core';
import NewDetail from './NewDetail';
import HeaderDetailNew from './HeaderDetailNew';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.secondary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },

}));

function NewApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = props.match.params;
    const { id } = params;
    useEffect(() => {

        function updateNewState() {
            
            dispatch(Actions.getNew(id));
            
        }

        updateNewState();

        return () => {
            dispatch(Actions.cleanUpNew())
        }
    }, [dispatch, id]);


    return (
        <div className="flex flex-col">
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderDetailNew {...props} />
                    </Grid>
                </Grid>
            </div>
            <NewDetail {...props} />
        </div>


    )
}

export default withReducer('newsApp', reducer)(NewApp);