import "./Searchbar.css";

const Searchbar = ({ handleCountries }) => {
  return (
    <>
      <input type="text" onChange={handleCountries} />
    </>
  );
};

export default Searchbar;
