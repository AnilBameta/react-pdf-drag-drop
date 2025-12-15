import { Document, Page } from "react-pdf";

export function PdfCanvas({
  pdfFile,
  field,
  mode,
  onDropField,
  onChangeValue,
}) {
  const canDrop = Boolean(pdfFile) && mode === "edit";

  const handleDragOver = (e) => {
    if (!canDrop) return;     
    e.preventDefault();     
  };

  const handleDrop = (e) => {
    if (!canDrop) return;

    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onDropField({ x, y });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        position: "relative",
        display: "inline-block",
        border: "1px solid #e5e7eb",
        background: pdfFile ? "#fff" : "#f9fafb",
      }}
    >
      {!pdfFile && (
        <div style={{ padding: 24, color: "#6b7280" }}>
          Upload a PDF to enable editing
        </div>
      )}

      {pdfFile && (
        <Document file={pdfFile}>
          <Page pageNumber={1} />
        </Document>
      )}

      {field && mode === "edit" && (
        <input
          value={field.value}
          onChange={(e) => onChangeValue(e.target.value)}
          style={{
            position: "absolute",
            left: field.x,
            top: field.y,
          }}
        />
      )}

      {field && mode === "preview" && (
        <div
          style={{
            position: "absolute",
            left: field.x,
            top: field.y,
            pointerEvents: "none",
          }}
        >
          {field.value}
        </div>
      )}
    </div>
  );
}
