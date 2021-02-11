import React, { FC, memo } from "react";
import { RestorePassFormView } from "./RestorePassFormView";
import {
  useRestorePassForm,
  UseRestorePassFormData,
} from "./useRestorePassForm";

export type RestorePassFormProps = UseRestorePassFormData;

export const RestorePassForm: FC<RestorePassFormProps> = memo(
  function RestorePassForm({ onFormTypeChange }) {
    const restorePassFormProps = useRestorePassForm({ onFormTypeChange });

    return <RestorePassFormView {...restorePassFormProps} />;
  }
);
