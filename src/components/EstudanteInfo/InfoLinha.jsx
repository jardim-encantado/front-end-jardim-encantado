export default function InfoRow({ label, disabled }) {
  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}
    >
      <p style={{ width: "80px", margin: 0 }}>{label}</p>

      <input
        type="text"
        disabled={disabled}
        style={{
          width: "250px",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          background: disabled ? "#f3f3f3" : "white"
        }}
      />
    </div>
  );
}