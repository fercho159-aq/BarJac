export default function Home() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>
        Error en el sitio
      </h1>
      <p style={{ fontSize: "1.125rem", margin: 0 }}>
        Favor de comunicarse con el desarrollador.
      </p>
    </div>
  );
}
