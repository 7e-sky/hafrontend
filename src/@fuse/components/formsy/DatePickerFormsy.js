import React from 'react';
import { withFormsy } from 'formsy-react';
import _ from '@lodash';
import 'date-fns';
import frLocale from "date-fns/locale/fr";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import moment from 'moment';

function DatePickerFormsy(props) {
    const importedProps = _.pick(props, [
        'label',
        'className',
        'disabled',
        'margin',
        'required',
        'onChange',
        'fullWidth',
        'variant',
    ]);

    const errorMessage = props.getErrorMessage();
    const value = props.getValue() !== null ?  moment(props.getValue()) : null;

    function changeValue(event) {
        
        props.setValue(moment(event).format('YYYY-MM-DDTHH:mm:ssZ')) ;
        if (props.onChange) {
            props.onChange(moment(event).format('YYYY-MM-DDTHH:mm:ssZ'));
        }
        console.log(moment(event).format('YYYY-MM-DDTHH:mm:ssZ'))
        console.log(moment(props.getValue()) )
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
            <DateTimePicker
                {...importedProps}
                autoOk
                onChange={changeValue}
                value={value}
                onError={console.log}
                inputVariant="outlined"
                format="dd/MM/yyyy HH:mm"
                minDate={moment()}
                error={Boolean(errorMessage)}
                helperText={errorMessage}
            />
        </MuiPickersUtilsProvider>
    );
}

export default React.memo(withFormsy(DatePickerFormsy));
