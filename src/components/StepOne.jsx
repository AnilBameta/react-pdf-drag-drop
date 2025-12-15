import { useRef } from "react";
import { Document, Page } from "react-pdf";

export function StepOne({
  pdfFile,
  setPdfFile,
  field,
  addField,
  updateValue,
  onNext,
}) {
  const pdfRef = useRef(null);

  const handleDrop = (e) => {
    if (!pdfFile || !pdfRef.current) return;

    const pdfRect = pdfRef.current.getBoundingClientRect();

    const x = e.clientX;
    const y = e.clientY;

    if (
      x < pdfRect.left ||
      x > pdfRect.right ||
      y < pdfRect.top ||
      y > pdfRect.bottom
    ) {
      return;
    }

    addField({
      x: x - pdfRect.left,
      y: y - pdfRect.top,
    });
  };

  return (
    <div style={{ display: "flex", height: "100%" }} className="container">
      <div style={{ width: '60%' }}>
        {pdfFile ? (
          <div
            ref={pdfRef}
            style={{ position: "relative", display: "inline-block", width: '100%' }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>

            {field && (
              <input
                value={field.value}
                onChange={(e) => updateValue(e.target.value)}
                style={{
                  position: "absolute",
                  left: field.x,
                  top: field.y,
                }}
              />
            )}
          </div>
        ) : (
          <div className="empty-container">
            <p>Upload pdf from right to get a preview</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }} className="right-container">
        <label
         className="label-upload"
        >
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </label>
        <span>Drag Field</span>
        <input
          draggable
          disabled
          style={{ marginTop: 16 }}
        />

        <button className="save-button" disabled={!field} onClick={onNext} style={{ marginTop: 16 }}>
          Save & Next
        </button>
      </div>
    </div>
  );
}
