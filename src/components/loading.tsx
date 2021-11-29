import { Spinner } from "reactstrap";
export default function Loading() {
  return (
    <li style={{ display: "flex", justifyContent: "center", width: "100%", margin: "5em 0" }}>
      <Spinner />
    </li>
  );
}
