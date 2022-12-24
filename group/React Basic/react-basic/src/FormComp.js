import React, { Component} from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
export class FormExample extends Component {
   handleSubmit = (values, {
      props = this.props,
      setSubmitting
   }) => {
      setSubmitting(false);
      return;
   }
   render() {
      return(
         <Formik
            initialValues={{
               first_name: '',
               last_name: ''
            }}
            validate={(values) => {
               let errors = {};
               if(!values.first_name)
               errors.first_name = "first name Required";
               //check if my values have errors
               return errors;
            }
         }
         onSubmit={this.handleSubmit}
         render={formProps => {
            return(
               <Form className="form">
                  <Field type="text" name="first_name" placeholder="First Name" autofill="off"/>
                  <ErrorMessage name="first_name" />
                  <Field type="text" name="last_name" placeholder="Last Name" autofill="off"/>
                  <ErrorMessage name="last_name" />
                  <button type="submit" disabled={formProps.isSubmitting}>
                     Submit Form
                  </button>
               </Form>
            );
         }}
      />);
   }
}
