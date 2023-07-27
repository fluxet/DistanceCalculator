import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../hook';
import { addNewDestination, setNewDestinationId } from '../distanceSlice';
import Destination from './Destination';
import { Formik, Form } from 'formik';
import { prepareCitiesQuery } from '../utils/utils';



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

  const yesterday = Date.now() - 86400000;
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
  };

  const [passengers, setPassengers] = useState(1);

  return (
    <div className='home-page'>
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


          const onDateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
            formikProps.setFieldValue(
              'date',
              evt.target.value,
            );
          };

          const onIncrementPassengers = () => {
            setPassengers(passengers => passengers + 1);
            formikProps.setFieldValue(
              'passengers',
              passengers + 1,
            );
          };

          const onDecrementPassengers = () => {
            if (passengers === 1) {
              return;
            };
            setPassengers(passengers => passengers - 1);
            formikProps.setFieldValue(
              'passengers',
              passengers - 1,
            );
          };


          return (
            <Form>
              <div className='distances'>
                {destinations.map(({ id }) => (
                  <Destination
                    key={id}
                    id={id}
                    {...formikProps}
                  />
                ))}
              </div>
              <button className='add-destination' onClick={onAddDestinationClick}>
                Add Destination
              </button>

              <div className='rest-form-parameters'>
                <div className='date'>
                  <div>Date</div>
                  <input onChange={onDateChange} type='date' name='date' min={new Date().toISOString().split('T')[0]} />
                </div>

                <div className='passengers'>
                  <label htmlFor='pasengers'>Passengers</label>
                  <div className='input-container'>
                    <button className='minus' type='button' onClick={onDecrementPassengers}>-</button>
                    <input type='number' min={1} name='passengers' disabled value={passengers} />
                    <button className='plus' type='button' onClick={onIncrementPassengers}>+</button>
                  </div>
                </div>

              </div>
              <input className='submit' type='submit' value='submit' disabled={!isSubmittingAllowed} />
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default Home;
