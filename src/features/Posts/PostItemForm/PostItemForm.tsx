import { useFormik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { Button } from '../../../UIKit/Button';
import { Input } from '../../../UIKit/Input';
import { TextArea } from '../../../UIKit/TextArea';
import styles from './PostItemForm.module.scss';
import { PostItemEditData } from './types';

interface PostItemFormProps {
  initialValues: PostItemEditData;
  onSubmit(values: PostItemEditData): void;
  onCancel(): void;
}

const validationSchema = yup.object({
  title: yup.string().required('Must not be empty!!!'),
  body: yup.string().required('Must not be empty!!!'),
});

export const PostItemForm: FC<PostItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik<PostItemEditData>({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.wrap}
    >
      <div className={styles.field}>
        <label>Title</label>
        <Input
          type="text"
          placeholder={'please input title'}
          {...formik.getFieldProps('title')}
        />
        {Boolean(formik.touched.title) && Boolean(formik.errors.title) && (
          <div className={styles.msgError}>{formik.errors.title}</div>
        )}
      </div>

      <div className={styles.field}>
        <label>Body</label>
        <TextArea
          placeholder={'please input title'}
          {...formik.getFieldProps('body')}
        />
        {Boolean(formik.touched.body) && Boolean(formik.errors.body) && (
          <div className={styles.msgError}>{formik.errors.body}</div>
        )}
      </div>

      <div className={styles.controlPanelWrap}>
        <Button type={'submit'}>save</Button>
        <Button type={'button'} onClick={onCancel}>
          cancel
        </Button>
      </div>
    </form>
  );
};
