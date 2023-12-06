import { headerName } from "../types";

const Header = ({ name }: headerName) => {
  if (typeof name !== "string") {
    return (
      <>
      Error: name is not a string
      </>
    )
  }


  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

export default Header;