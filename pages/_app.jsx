import "./App.css";

import Typography from "@mui/material/Typography";

import { TestComponent } from "../components/TestComponent";

export default function App() {
  return (
    <div className="App">
      <Typography variant="h1">TestWebsite</Typography>
      <br />
      <TestComponent />
    </div>
  );
}
