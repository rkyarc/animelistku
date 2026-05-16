export default function maintenancePage({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="rounded-full border-2 border-red-500 p-6 sm:p-8">
        <h1 style={{ fontSize: "2rem" }}>🚧 Maintenance</h1>
        <p>Website sedang diperbaiki. Silakan kembali nanti.</p>
      </div>
    </div>
  );
}
