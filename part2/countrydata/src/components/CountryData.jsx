const CountryData = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
      <div>capital: {props.capital}</div>
      <div>area: {props.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(props.languages).map((langs) => (
          <li key={langs}>{langs}</li>
        ))}
      </ul>
      <img src={props.flagImg} alt={props.flagAlt} className="flag" />
    </>
  );
};

export default CountryData;
