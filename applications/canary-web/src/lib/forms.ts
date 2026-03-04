import type { SubmitEvent } from "react";

const getFormData = (event: SubmitEvent<HTMLFormElement>): FormData => {
  return new FormData(event.currentTarget);
};

export { getFormData };
