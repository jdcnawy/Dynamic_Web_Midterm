"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudBolt,faCloud,faUmbrella,faSnowflake,faSun,faSmog } from "@fortawesome/free-solid-svg-icons";


const WeatherIcon = ({weatherType}) => {
    switch (weatherType) {
        case "Clouds":
            return <FontAwesomeIcon icon={faCloud} />
        case "Drizzle":
        case "Rain":
            return <FontAwesomeIcon icon={faUmbrella} />
        case "Snow":
            return <FontAwesomeIcon icon={faSnowflake} />
        case "Clear":
            return <FontAwesomeIcon icon={faSun} />
        case "Thunderstorm":
            return <FontAwesomeIcon icon={faCloudBolt} />
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Dust":
        case "Fog":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
            return <FontAwesomeIcon icon={faSmog} />
        default:
                return <div> this works </div>    
    }   
    
};

export default WeatherIcon;