import { Spinner } from "reactstrap";
export default function Loading() {
  return (
    <li style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "2em" }}>
      <Spinner />
    </li>
  );
}
