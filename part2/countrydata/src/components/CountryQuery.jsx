const CountryQuery = ({ country, handleShow }) => {
  return (
    <div key={country}>
      {country} <button onClick={handleShow}>show</button>
    </div>
  );
};

export default CountryQuery;
