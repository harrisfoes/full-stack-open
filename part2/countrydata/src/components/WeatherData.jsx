const WeatherData = (props) => {
  return (
    <div>
      <h2>Weather in {props.name}</h2>
      <div>temperature {props.temp} Celcius</div>
      <img src={props.wIcon} alt={props.wText} />
      <div>wind: {props.wind} mph</div>
    </div>
  );
};

export default WeatherData;
