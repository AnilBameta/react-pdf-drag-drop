import { useState } from "react";

export function usePdfEditor() {
  const [step, setStep] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [field, setField] = useState(null);

  const addField = (pos) => {
    setField({ ...pos, value: "" });
  };

  const updateValue = (value) => {
    setField((prev) => ({ ...prev, value }));
  };

  const reset = () => {
    setStep(1);
    setPdfFile(null);
    setField(null);
  };

  return {
    step,
    setStep,
    pdfFile,
    setPdfFile,
    field,
    addField,
    updateValue,
    reset,
  };
}
