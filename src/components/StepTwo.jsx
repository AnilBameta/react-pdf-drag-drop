import { Document, Page } from "react-pdf";
import { downloadPdf } from "../utils/pdfUtils";

export function StepTwo({ pdfFile, field, onReset }) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 3, position: "relative" }}>
        <Document file={pdfFile}>
          <Page pageNumber={1} />
        </Document>

        <div
          style={{
            position: "absolute",
            left: field.x,
            top: field.y,
            background: "#fff",
            padding: "4px",
          }}
        >
          {field.value}
        </div>
      </div>

      <div style={{ flex: 1, padding: 16 }}>
        <button
        className="save-button"
          onClick={async () => {
            await downloadPdf(pdfFile, field);
            onReset();
          }}
        >
          Save & Download
        </button>
      </div>
    </div>
  );
}
