import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hook';
import { addNewDestination, setNewDestinationId } from '../distanceSlice';
import Destination from './Destination';
import { Formik, Form } from 'formik';
import { prepareCitiesQuery } from '../utils';

export interface FormValues {
  destination0: [string, number, number] | null;
  destination1: [string, number, number] | null;
  date: string;
  passengers: number;
}

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const destinations = useAppSelector(state => state.distance.destinations);
  const newDestinationId = useAppSelector(state => state.distance.freeDestinationId);
  const responseStatus = useAppSelector(state => state.distance.responseStatus);

  const destinationsShape = destinations
    .reduce((acc, destination) => ({ ...acc, [`destination${destination.id}`]: Yup.array().required('fill city of destination') || Yup.string().required('fill city of destination') }), {});

  const fieldsShape = {
    date: Yup.string().required('select date'),
    passengers: Yup.string().required('select the number of passengers'),
    ...destinationsShape
  };

  const validationSchema = Yup.object().shape(fieldsShape);

  const onAddDestinationClick = () => {
    dispatch(addNewDestination(newDestinationId));
    dispatch(setNewDestinationId());
  };

  const onSubmitClick = (values: FormValues) => {
    const { date, passengers, ...citiesValues } = values;
    const citiesQuery = prepareCitiesQuery(Object.values(citiesValues));
    navigate(`/search_results?date=${date}&passengers=${passengers}&cities=${citiesQuery}`);
  }

  return (
    <div className='home-page'>
      <div>Home</div>
      <Formik
        initialValues={{
          destination0: null,
          destination1: null,
          passengers: 1,
          date: null,
        }}
        onSubmit={onSubmitClick}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {(formikProps) => {
          const isSubmittingAllowed = formikProps.dirty && formikProps.isValid && (responseStatus !== 'rejected');

          const onPassengersInput = (evt: any) => {
            formikProps.setFieldValue(
              'passengers',
              evt.target.value,
            );
          };

          const onDateChange = (evt: any) => {
            formikProps.setFieldValue(
              'date',
              evt.target.value,
            );
          };

          return (
            <Form>
              <div className='distances'>
                {destinations.map(({ id }) => {

                  return (
                    <Destination
                      key={id}
                      id={id}
                      {...formikProps}
                    />
                  )
                })}
              </div>
              <div className='rest-form-parameters'>
                <div className='passengers'>
                  <label htmlFor='pasengers'>Passengers</label>
                  <div className='passengers-input-container'>
                    <input onInput={onPassengersInput} type='number' min={1} name='passengers' />
                    <button>+</button>
                    <button>-</button>
                  </div>
                </div>
                <div className='date'>
                  <input onChange={onDateChange} type='date' name='date' />
                </div>
              </div>

              <button onClick={onAddDestinationClick}>Add Destination</button>
              <input className='submit' type='submit' value='submit' disabled={!isSubmittingAllowed} />
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default Home;
