import React, { CSSProperties, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../hook';
import { clearMatchedCities, deleteDestination, requestMatchedCities, setCity, setCurrentDestinationId } from '../distanceSlice';
import { ClipLoader } from 'react-spinners';
import { FormValues, IDestinationProps } from '../types';

const Destination: React.FC<IDestinationProps> = ({ id, setFieldValue, errors, ...restProps }) => {
  const dispatch = useAppDispatch();
  const destinationName = `destination${id}` as keyof FormValues;
  const matchedCities = useAppSelector(state => state.distance.matchedCities);
  const responseStatus = useAppSelector(state => state.distance.responseStatus);
  const focusedDestinationId = useAppSelector(state => state.distance.currentDestinationId);
  const responseErrorMessage = useAppSelector(state => state.distance.errorMessage);
  const destinationLabel = (id === 0) ? 'City of origin' : 'City of destination';
  const isLoading = id === focusedDestinationId && responseStatus === 'loading';
  const isResponseError = id === focusedDestinationId && responseStatus === 'rejected';
  const [isTouched, setIsTouched] = useState(false);
  const isCurrentFieldError = isResponseError || (isTouched && !!errors[destinationName]);
  const isAdditionalDestination = id > 1;

  const override: CSSProperties = {
    position: 'absolute',
    top: '40px',
    left: '40%',
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
    setIsTouched(true);
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

  const ErrorComponent = (msg: string) => <div className='error-message'>{msg}</div>;

  return (
    <div className='autocomplete'>
      <div className='label'>{destinationLabel}</div>
      <Autocomplete
        id={`${id}`}
        className={isCurrentFieldError ? 'invalid' : ''}
        options={matchedCities}
        sx={{ width: 300 }}
        onInputChange={onInputChange}
        onChange={onChange}
        getOptionLabel={([name]) => name}
        renderInput={(params) => <TextField name={destinationName} {...params} label='' />}
        onFocus={onAutocompleteFocus}
        onBlur={onAutocompleteBlur}
      />
      {isResponseError
        ? <div className='server-error-message'>{responseErrorMessage}</div>
        : <ErrorMessage render={ErrorComponent} name={destinationName} component='div' />
      }
      <ClipLoader
        cssOverride={override}
        loading={isLoading}
      />
      {isAdditionalDestination && <button className='delete-destination' onClick={onDeleteDestinationClick}>delete</button>}
    </div>
  );
}

export default Destination;