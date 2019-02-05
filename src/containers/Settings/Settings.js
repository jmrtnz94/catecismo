import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import {Grid, Paper, CircularProgress, FormControl, InputLabel, Input, Select, Button, MenuItem, Divider} from '@material-ui/core';

class Settings extends Component {
    state = {
        locale: null
    }

    componentDidMount(){
        this.setState({locale: localStorage.getItem("locale")});
    }

    changeLanguageHandler = (event) => {
        this.setState({locale: event.target.value});
    }

    saveSettingsHandler = (event) => {
        localStorage.setItem("locale", this.state.locale);
        this.props.history.push('/');
        window.location.reload();
    }

    clearSettingsHandler = () => {
        localStorage.removeItem("viewed_fc_instructions_en");
        localStorage.removeItem("viewed_fc_instructions_es");
        localStorage.setItem("locale", 'en');
        this.props.history.push('/');
        window.location.reload();
    }

    render() {
        const {formatMessage} = this.props.intl;

        let settingsHtml = <Grid item xs={12} style={{textAlign: 'center', padding: 20}}><CircularProgress /></Grid>;
        if(this.state.locale !== null){
            settingsHtml = (
                <>
                    <Grid item xs={12}>
                        <Paper style={{padding: 20}}>
                            <h1><FormattedMessage id="Settings" defaultMessage="Settings" /></h1>
                            <Grid container spacing={16} justify="space-between">
                                <Grid item xs={12}>
                                    <FormControl>
                                        <InputLabel shrink htmlFor="locale-label-placeholder">
                                            <FormattedMessage id="Language" defaultMessage="Language" />
                                        </InputLabel>
                                        <Select
                                            value={this.state.locale}
                                            onChange={this.changeLanguageHandler}
                                            input={<Input name="locale" id="locale-label-placeholder" />}
                                            displayEmpty
                                            name="locale" >
                                            
                                            <MenuItem value='en'>{formatMessage({id: 'English'})}</MenuItem>
                                            <MenuItem value='es'>{formatMessage({id: 'Spanish'})}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={this.saveSettingsHandler}><FormattedMessage id="Save" defaultMessage="Save" /></Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                    <div style={{textAlign: 'center', marginTop: '5px'}}>
                                        <Button variant="contained" color="secondary" onClick={this.clearSettingsHandler}><FormattedMessage id="settings.clear_settings" defaultMessage="Clear Settings" /></Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}><Button variant="contained" color="primary" onClick={() => this.props.history.push('/about')} fullWidth><FormattedMessage id="View About" defaultMessage="View About" /></Button></Grid>
                </>
            )
        }

        return (
            <Grid container spacing={16} justify="center">
                {settingsHtml}
            </Grid>
        );
    }
}

export default injectIntl(Settings);