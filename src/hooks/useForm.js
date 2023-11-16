import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {} , formValdations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    
    const [ formValidation, setFormValidation ] = useState({});
    
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation )) {
            if(formValidation[formValue] !== null) {
                return false;
            }
        }
        return true
    },[formValidation]);

    useEffect(() => {
      createValidators();
    }, [formState])
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for(const formField of Object.keys( formValdations )) {
            const [fn, errorMessage] = formValdations[formField];
            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        // console.log(formCheckedValues);
        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        ...formValidation,
        formState,
        onInputChange,
        onResetForm,
        isFormValid,
    }
}