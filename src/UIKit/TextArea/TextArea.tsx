import { FC, TextareaHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  return <textarea className={styles.wrap} {...props} />;
};
