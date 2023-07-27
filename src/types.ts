import { FormikProps } from "formik";

export type TCity = [string, number, number];
export type TCities = TCity[];

export interface FormValues {
  destination0: [string, number, number] | null;
  destination1: [string, number, number] | null;
  date: string;
  passengers: number;
}

export interface IDestinationProps extends FormikProps<FormValues> {
  id: number;
};

export interface IResponseSuccessProps {
  cities: TCities;
  distances: number[];
  date: string;
  passengers: string;
};