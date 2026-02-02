import { useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError(error) {
      console.error("Failed to create note:", error);
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values);
        resetForm();
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              type="text"
              name="title"
              id={`${fieldId}-title`}
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              name="content"
              id={`${fieldId}-content`}
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              as="select"
              name="tag"
              className={css.select}
              id={`${fieldId}-tag`}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
