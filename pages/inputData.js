import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import AppLayout from '../components/Layout/AppLayout';
import Button from '@material-ui/core/Button'
import axios from 'axios'

const InputData = () => {


    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginTop: 20,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));


    const classes = useStyles();
    const [url, setUrl] = useState('')

    const urlSubmit = () => {
        axios.post('http://localhost:3065/api/inputData', { url: url });
        setUrl('')

    }

    const urlChange = (e) => {
        setUrl(e.target.value)
    }

    console.log(url)
    return (
        <AppLayout>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <TextField defaultValue="Hello World" onChange={urlChange} value={url} />
                    <Button onClick={urlSubmit}>Submit</Button>
                </Grid>
            </div>
        </AppLayout>

    );
};

export default InputData;
