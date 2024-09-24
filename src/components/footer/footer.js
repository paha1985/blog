import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('Лондон');
	const [temperature, setTemperature] = useState('15');
	const [weather, setWeather] = useState('Тепло');

	// useEffect(() => {
	// 	fetch(
	// 		'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=ru&appid=8a320d2d663993c53fcde249b4a91868',
	// 	)
	// 		.then((res) => res.json())
	// 		.then(({ name, main, weather }) => {
	// 			setCity(name);
	// 			setTemperature(Math.round(main.temp));
	// 			setWeather(weather[0].description);
	// 		});
	// }, []);

	useEffect(() => {
		setCity('Лондон');
		setTemperature('15');
		setWeather('Тепло');
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: rgb(255, 255, 255);
	box-shadow: rgb(0, 0, 0) 0px 2px 17px;
`;
