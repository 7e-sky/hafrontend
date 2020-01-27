import React from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';

function Widget3(props)
{
    return (
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                <Typography className="text-16 font-bold">Produit(s) en attente(s)</Typography>
                <IconButton aria-label="more">
                    <Icon>more_vert</Icon>
                </IconButton>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-orange">{props.widget}</Typography>
                <Typography className="text-16" color="textSecondary">Produit(s)</Typography>
            </div>
            {/*
            <div className="flex items-center px-16 h-52 border-t-1">
                <Typography className="text-15 flex w-full" color="textSecondary">
                    <span className="truncate">{props.widget.data.extra.label}</span>
                    :
                    <b className="pl-8">{props.widget.data.extra.count}</b>
                </Typography>
            </div>*/}
        </Paper>
    );
}

export default React.memo(Widget3);