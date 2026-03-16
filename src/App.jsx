import Home from "./pages/Home";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <Home />

      <div style={{ marginTop: "20px" }}>
        <button style={{ marginRight: "10px" }}>
          Student Application
        </button>

        <button>
          Teacher Application
        </button>
      </div>
    </div>
  );
}

export default App;