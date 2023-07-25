import React, { CSSProperties, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ErrorMessage, FormikProps } from 'formik';
import { useAppDispatch, useAppSelector } from '../hook';
import { clearMatchedCities, deleteDestination, requestMatchedCities, setCity, setCurrentDestinationId } from '../distanceSlice';
import { ClipLoader } from 'react-spinners';
import { FormValues } from './Home';

interface IDestinationProps extends FormikProps<FormValues> {
  id: number;
};

const Destination: React.FC<IDestinationProps> = ({ id, setFieldValue, ...restProps }) => {
  const dispatch = useAppDispatch();
  const matchedCities = useAppSelector(state => state.distance.matchedCities);
  const responseStatus = useAppSelector(state => state.distance.responseStatus);
  const focusedDestinationId = useAppSelector(state => state.distance.currentDestinationId);
  const responseErrorMessage = useAppSelector(state => state.distance.errorMessage);
  const destinationLabel = (id === 0) ? 'City of origin' : 'City of destination';
  const isLoading = id === focusedDestinationId && responseStatus === 'loading';
  const isResponseError = id === focusedDestinationId && responseStatus === 'rejected';
  const isAdditionalDestination = id > 1;
  const destinationName = `destination${id}`;

  const override: CSSProperties = {
    position: 'absolute',
    top: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '100',
  };

  const onInputChange = (event: React.SyntheticEvent<Element, Event>, value: string) => {
    dispatch(requestMatchedCities(value));
  };

  const onChange = (evt: React.SyntheticEvent<Element, Event>, city: [string, number, number]) => {
    setFieldValue(
      destinationName,
      city,
    );

    dispatch(setCity({
      id: focusedDestinationId,
      city,
    }));
  };

  const onAutocompleteFocus = (evt: React.SyntheticEvent<HTMLDivElement>) => {
    const { id } = evt.target as HTMLDivElement;
    dispatch(setCurrentDestinationId(+id));
  };

  const onAutocompleteBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    const { value } = target as HTMLInputElement;

    if (!value) {
      restProps.setFieldTouched(
        destinationName,
        true,
      );
      restProps.setFieldError(
        destinationName,
        'fill city of destination'
      );
    }
    dispatch(clearMatchedCities());
  };

  const onDeleteDestinationClick = () => {
    setFieldValue(
      destinationName,
      null,
    );
    dispatch(deleteDestination(id));
  };

  return (
    <div className='autocomplete'>
      <Autocomplete
        id={`${id}`}
        options={matchedCities}
        sx={{ width: 300 }}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionLabel={([name]) => name}
        renderInput={(params) => <TextField name={destinationName} {...params} label={destinationLabel} />}
        onFocus={onAutocompleteFocus}
        onBlur={onAutocompleteBlur}
      />
      {isResponseError
        ? <div>{responseErrorMessage}</div>
        : <ErrorMessage className='error_message' name={destinationName} component='div' />
      }
      <ClipLoader
        cssOverride={override}
        loading={isLoading}
      />
      {isAdditionalDestination && <button onClick={onDeleteDestinationClick}>delete</button>}
    </div>
  );
}

export default Destination;