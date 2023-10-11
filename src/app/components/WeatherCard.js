"use client"
import styles from "./WeatherCard.module.css"

const WeatherCard = ({
    cityName,
    currentTemperature,
    highTemperature,
    weatherType,
    lowTemperature,
    cloudiness,
    humidity,
    windSpeed,
}) =>
    <div className = {styles.WeatherCardWrapper}>
        <h2>{cityName}</h2>
        <p>Weather Type:{weatherType}</p>
        <p>Current Temperature:{currentTemperature}</p>
        <p>High Temperature:{highTemperature}</p>
        <p>Low Temperature:{lowTemperature}</p>
        <p>Cloudiness:{cloudiness}</p>
        <p>Humidity:{humidity}</p>
        <p>Wind Speed:{windSpeed}</p>
    </div>

export default WeatherCard;