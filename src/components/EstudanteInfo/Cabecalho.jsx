export default function Cabecalho({ title }) {
  return (
    <div
      style={{
        background: "#f1a5a5",
        padding: "8px 15px",
        fontWeight: "bold",
        color: "white"
      }}
    >
      {title}
    </div>
  );
}