import * as React from 'react';
import { observer } from 'mobx-react';
import { withProperties } from 'react-property-provider';
import TextAreaField from './primitives/TextAreaField';
import FormField from '../../models/FormField';
import Page from '../../models/Page';
import FormFieldLabel from '../primitives/FormFieldLabel';
import FormFieldWrapper from '../primitives/FormFieldWrapper';

function handleChange( field: FormField, event: React.FormEvent<any> ) {
    field.setValue( ( event.target as HTMLInputElement ).value );
}

interface ITextAreaProps {
    parentPage?: Page; // injected
    formField: FormField;
}

function TextArea( props: ITextAreaProps ) {
    const { parentPage, formField } = props;
    const { id, label, value, placeholder, valid, errorMessage, setValid } = formField;

    return (
        <FormFieldWrapper htmlFor={id}>
            <FormFieldLabel>{label}</FormFieldLabel>
            <TextAreaField
                baseColor={parentPage.backgroundColor}
                placeholder={valid ? placeholder : errorMessage}
                valid={valid}
                id={id}
                onFocus={setValid}
                onChange={handleChange.bind( null, formField )}
                value={valid ? value : ''}
            />
        </FormFieldWrapper>
    );
}

// TODO: If I decide to store the current page in a store,
// i can remove this injection method and library and use mobx
export default withProperties( observer( TextArea ), 'parentPage' );