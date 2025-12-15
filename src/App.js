import { pdfjs } from "react-pdf";
import { usePdfEditor } from "./hooks/usePdfEditor";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";


pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function App() {
  const editor = usePdfEditor();

  return (
    <div style={{ height: "100vh" }}>
      {editor.step === 1 && (
        <StepOne
          {...editor}
          onNext={() => editor.setStep(2)}
        />
      )}

      {editor.step === 2 && (
        <StepTwo
          pdfFile={editor.pdfFile}
          field={editor.field}
          onReset={editor.reset}
        />
      )}
    </div>
  );
}
