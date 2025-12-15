export function Sidebar({
  step,
  pdfSelected,
  fieldPlaced,
  onUpload,
  onNext,
  onDownload,
}) {
  return (
    <div
      style={{
        width: 300,
        padding: 16,
        borderLeft: "1px solid #e5e7eb",
        background: "#ffffff",
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {step === 1 && (
        <>
          <h3 style={{ marginBottom: 12 }}>Step 1: Edit</h3>

          <input
            type="file"
            accept="application/pdf"
            onChange={onUpload}
            style={{ marginBottom: 16 }}
          />

          <input
            draggable
            disabled={!pdfSelected}
            placeholder="Drag input"
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "field");
            }}
            style={{
              width: "100%",
              padding: "8px",
              cursor: pdfSelected ? "grab" : "not-allowed",
              opacity: pdfSelected ? 1 : 0.5,
              marginBottom: 16,
            }}
          />

          <button
            disabled={!fieldPlaced}
            onClick={onNext}
            style={{
              width: "100%",
              padding: "10px",
              background: fieldPlaced ? "#2563eb" : "#93c5fd",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: fieldPlaced ? "pointer" : "not-allowed",
            }}
          >
            Save & Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 style={{ marginBottom: 12 }}>Step 2: Preview</h3>

          <button
            onClick={onDownload}
            style={{
              width: "100%",
              padding: "10px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Save & Download
          </button>
        </>
      )}
    </div>
  );
}
