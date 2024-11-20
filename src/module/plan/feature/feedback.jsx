/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik, Form, Field } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import usePostComplaints from '../hooks/usePostComplaints';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('عنوان را وارد کنید'),
  message: Yup.string().required('متن را وارد کنید').min(10, 'متن باید بیشتر از ده کلمه باشد'),
});

const Feedback = () => {
  const { traceCode } = useParams();
  const { mutate } = usePostComplaints(traceCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">با ما درمیان بگذارید</h2>

      <Formik
        initialValues={{ title: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          mutate(values);
          toast.success('شکایت با موفقیت ثبت شد');
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                عنوان شکایت
              </label>
              <Field
                type="text"
                name="title"
                className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="عنوان"
              />
              {errors.title && touched.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                متن شکایت
              </label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border bg-gray-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="متن"
              />
              {errors.message && touched.message && (
                <div className="text-red-500 text-sm">{errors.message}</div>
              )}
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              ثبت شکایت
            </motion.button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default Feedback;
