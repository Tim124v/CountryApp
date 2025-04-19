import React, { useState, useEffect } from 'react';
import { FaPlane, FaHotel, FaAirbnb, FaTrain, FaBus, FaCity, FaLandmark, FaUmbrellaBeach, FaArchway, FaChurch, FaFortAwesome, FaUniversity, FaBuilding, FaMonument, FaShip, FaInfoCircle, FaHeart, FaShare, FaMapMarkerAlt, FaTemperatureHigh, FaClock, FaEuroSign, FaDollarSign, FaWind, FaCloudRain, FaCloud, FaSun, FaMoon, FaSunrise } from 'react-icons/fa';
import { SiAirbnb } from 'react-icons/si';
import './CityModal.css';

const WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Замените на ваш ключ

// Добавляем часовые пояса для городов
const cityTimeZones = {
  'Париж': 'Europe/Paris',
  'Ницца': 'Europe/Paris',
  'Рим': 'Europe/Rome',
  'Венеция': 'Europe/Rome',
  'Барселона': 'Europe/Madrid',
  'Мадрид': 'Europe/Madrid',
  'Берлин': 'Europe/Berlin',
  'Мюнхен': 'Europe/Berlin',
  'Афины': 'Europe/Athens',
  'Санторини': 'Europe/Athens',
  'Амстердам': 'Europe/Amsterdam',
  'Роттердам': 'Europe/Amsterdam',
  'Киев': 'Europe/Kiev',
  'Львов': 'Europe/Kiev',
  'Варшава': 'Europe/Warsaw',
  'Краков': 'Europe/Warsaw',
  'Лиссабон': 'Europe/Lisbon',
  'Порту': 'Europe/Lisbon',
  'Загреб': 'Europe/Zagreb',
  'Дубровник': 'Europe/Zagreb',
  'Валлетта': 'Europe/Malta',
  'Мдина': 'Europe/Malta',
  'Будапешт': 'Europe/Budapest',
  'Дебрецен': 'Europe/Budapest',
  'Никосия': 'Asia/Nicosia',
  'Лимассол': 'Asia/Nicosia'
};

const CityModal = ({ isOpen, onClose, country }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [cityTimes, setCityTimes] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [expandedInfo, setExpandedInfo] = useState({});
  const [showMap, setShowMap] = useState({});

  // Координаты городов
  const cityCoordinates = {
    'Париж': { lat: 48.8566, lng: 2.3522 },
    'Ницца': { lat: 43.7102, lng: 7.2620 },
    'Рим': { lat: 41.9028, lng: 12.4964 },
    'Венеция': { lat: 45.4408, lng: 12.3155 },
    'Барселона': { lat: 41.3851, lng: 2.1734 },
    'Мадрид': { lat: 40.4168, lng: -3.7038 },
    'Берлин': { lat: 52.5200, lng: 13.4050 },
    'Мюнхен': { lat: 48.1351, lng: 11.5820 },
    'Афины': { lat: 37.9838, lng: 23.7275 },
    'Санторини': { lat: 36.3932, lng: 25.4615 },
    'Амстердам': { lat: 52.3676, lng: 4.9041 },
    'Роттердам': { lat: 51.9244, lng: 4.4777 },
    'Киев': { lat: 50.4501, lng: 30.5234 },
    'Львов': { lat: 49.8397, lng: 24.0297 },
    'Варшава': { lat: 52.2297, lng: 21.0122 },
    'Краков': { lat: 50.0647, lng: 19.9450 },
    'Лиссабон': { lat: 38.7223, lng: -9.1393 },
    'Порту': { lat: 41.1579, lng: -8.6291 },
    'Загреб': { lat: 45.8150, lng: 15.9819 },
    'Дубровник': { lat: 42.6507, lng: 18.0944 },
    'Валлетта': { lat: 35.8989, lng: 14.5146 },
    'Мдина': { lat: 35.8869, lng: 14.4025 },
    'Будапешт': { lat: 47.4979, lng: 19.0402 },
    'Дебрецен': { lat: 47.5316, lng: 21.6273 },
    'Никосия': { lat: 35.1856, lng: 33.3823 },
    'Лимассол': { lat: 34.7071, lng: 33.0226 }
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) return <FaCloudRain />; // Гроза
    if (weatherCode >= 300 && weatherCode < 500) return <FaCloudRain />; // Морось
    if (weatherCode >= 500 && weatherCode < 600) return <FaCloudRain />; // Дождь
    if (weatherCode >= 600 && weatherCode < 700) return <FaCloudRain />; // Снег
    if (weatherCode >= 700 && weatherCode < 800) return <FaCloud />; // Туман
    if (weatherCode === 800) return <FaSun />; // Ясно
    return <FaCloud />; // Облачно
  };

  const getWeatherDescription = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) return 'Гроза';
    if (weatherCode >= 300 && weatherCode < 500) return 'Морось';
    if (weatherCode >= 500 && weatherCode < 600) return 'Дождь';
    if (weatherCode >= 600 && weatherCode < 700) return 'Снег';
    if (weatherCode >= 700 && weatherCode < 800) return 'Туман';
    if (weatherCode === 800) return 'Ясно';
    return 'Облачно';
  };

  const fetchWeather = async (cityName) => {
    try {
      const coords = cityCoordinates[cityName];
      if (!coords) return;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
      );
      
      if (!response.ok) throw new Error('Weather fetch failed');
      
      const data = await response.json();
      
      setWeatherData(prev => ({
        ...prev,
        [cityName]: {
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
          description: data.weather[0].description,
          weatherCode: data.weather[0].id
        }
      }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const updateCityTime = (cityName) => {
    try {
      const timeZone = cityTimeZones[cityName];
      if (!timeZone) return;

      const time = new Date().toLocaleString('ru-RU', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      const date = new Date().toLocaleDateString('ru-RU', {
        timeZone,
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      setCityTimes(prev => ({
        ...prev,
        [cityName]: { time, date }
      }));
    } catch (error) {
      console.error('Error updating city time:', error);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
      
      // Установка локального времени
      const updateTime = () => {
        const time = new Date().toLocaleTimeString('ru-RU', {
          timeZone: 'Europe/Moscow',
          hour: '2-digit',
          minute: '2-digit'
        });
        setCityTimes(prev => ({
          ...prev,
          [selectedCity]: { time, date: new Date().toLocaleDateString('ru-RU') }
        }));
      };
      
      updateTime();
      const timer = setInterval(updateTime, 60000);
      return () => clearInterval(timer);
    }
  }, [selectedCity]);

  // Обновляем погоду при разворачивании информации о городе
  useEffect(() => {
    Object.entries(expandedInfo).forEach(([cityName, isExpanded]) => {
      if (isExpanded && !weatherData[cityName]) {
        fetchWeather(cityName);
      }
    });
  }, [expandedInfo]);

  // Обновляем время для всех раскрытых городов
  useEffect(() => {
    const updateAllExpandedCities = () => {
      Object.entries(expandedInfo).forEach(([cityName, isExpanded]) => {
        if (isExpanded) {
          updateCityTime(cityName);
        }
      });
    };

    updateAllExpandedCities();
    const interval = setInterval(updateAllExpandedCities, 60000);

    return () => clearInterval(interval);
  }, [expandedInfo]);

  // Обновляем время при разворачивании информации о городе
  useEffect(() => {
    Object.entries(expandedInfo).forEach(([cityName, isExpanded]) => {
      if (isExpanded && !cityTimes[cityName]) {
        updateCityTime(cityName);
      }
    });
  }, [expandedInfo]);

  const toggleFavorite = (cityName) => {
    setFavorites(prev => 
      prev.includes(cityName) 
        ? prev.filter(city => city !== cityName)
        : [...prev, cityName]
    );
  };

  const shareCity = (cityName) => {
    const cityInfo = cities[country]?.find(city => city.name === cityName);
    if (cityInfo) {
      const text = `Посетите ${cityName} - ${cityInfo.description}`;
      if (navigator.share) {
        navigator.share({
          title: `Путешествие в ${cityName}`,
          text: text,
          url: window.location.href
        }).catch(console.error);
      } else {
        alert(`Поделиться: ${text}`);
      }
    }
  };

  const toggleExpandedInfo = (cityName) => {
    setExpandedInfo(prev => ({
      ...prev,
      [cityName]: !prev[cityName]
    }));
  };

  const toggleMap = (cityName) => {
    setShowMap(prev => ({
      ...prev,
      [cityName]: !prev[cityName]
    }));
  };

  const openGoogleMaps = (cityName) => {
    const coords = cityCoordinates[cityName];
    if (coords) {
      const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!isOpen) return null;

  const getCityIcon = (cityName) => {
    const icons = {
      'Париж': <FaLandmark />,
      'Ницца': <FaUmbrellaBeach />,
      'Рим': <FaArchway />,
      'Венеция': <FaBuilding />,
      'Барселона': <FaChurch />,
      'Мадрид': <FaCity />,
      'Берлин': <FaMonument />,
      'Мюнхен': <FaFortAwesome />,
      'Афины': <FaLandmark />,
      'Санторини': <FaUmbrellaBeach />,
      'Амстердам': <FaBuilding />,
      'Роттердам': <FaCity />,
      'Киев': <FaChurch />,
      'Львов': <FaFortAwesome />,
      'Варшава': <FaCity />,
      'Краков': <FaLandmark />,
      'Лиссабон': <FaMonument />,
      'Порту': <FaBuilding />,
      'Загреб': <FaCity />,
      'Дубровник': <FaUmbrellaBeach />,
      'Валлетта': <FaArchway />,
      'Мдина': <FaFortAwesome />,
      'Никосия': <FaCity />,
      'Лимассол': <FaUmbrellaBeach />,
      'Лион': <FaCity />,
      'Флоренция': <FaCity />,
      'Севилья': <FaCity />
    };
    return icons[cityName] || <FaCity />;
  };

  const getBookingUrl = (city, type) => {
    if (!city || !type) return '#';
    const baseUrl = 'https://example.com/booking';
    return `${baseUrl}/${encodeURIComponent(city)}/${encodeURIComponent(type)}`;
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'самолет': return FaPlane;
      case 'поезд': return FaTrain;
      case 'автобус': return FaBus;
      case 'паром': return FaShip;
      default: return FaBus;
    }
  };

  const getAccommodationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'отели': return FaHotel;
      case 'airbnb': return SiAirbnb;
      default: return FaBuilding;
    }
  };

  const ImageWithFallback = ({ src, alt }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
      return (
        <div className="image-fallback">
          <FaBuilding />
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  };

  const TransportOption = ({ city, type, price }) => {
    const handleClick = () => {
      const url = getBookingUrl(city, type);
      if (url !== '#') window.open(url, '_blank');
    };

    const Icon = getTransportIcon(type);

    return (
      <div className="transport-option" onClick={handleClick}>
        <div className="transport-info">
          <div className="option-icon">
            <Icon />
          </div>
          <span className="transport-type">{type}</span>
          <span className="transport-price">{price}</span>
        </div>
        <div className="booking-hint">
          Забронировать <span className="arrow">→</span>
        </div>
      </div>
    );
  };

  const AccommodationOption = ({ city, type, price, rating }) => {
    const handleClick = () => {
      const url = getBookingUrl(city, type);
      if (url !== '#') window.open(url, '_blank');
    };

    const Icon = getAccommodationIcon(type);

    return (
      <div className="accommodation-option" onClick={handleClick}>
        <div className="accommodation-info">
          <div className="option-icon">
            <Icon />
          </div>
          <span className="accommodation-type">{type}</span>
          <span className="accommodation-price">{price}</span>
          {rating && <span className="accommodation-rating">{rating}</span>}
        </div>
        <div className="booking-hint">
          Забронировать <span className="arrow">→</span>
        </div>
      </div>
    );
  };

  const getCurrencySymbol = (country) => {
    const currencies = {
      FRANCE: '€',
      ITALY: '€',
      SPAIN: '€',
      GERMANY: '€',
      GREECE: '€',
      NETHERLANDS: '€',
      UKRAINE: '₴',
      POLAND: 'zł',
      PORTUGAL: '€',
      CROATIA: '€',
      MALTA: '€',
      HUNGARY: 'Ft',
      CYPRUS: '€'
    };
    return currencies[country];
  };

  const getTransportInfo = (type) => {
    const info = {
      'Самолет': 'Прямые рейсы и с пересадками',
      'Поезд': 'Включая ночные поезда',
      'Автобус': 'Международные автобусные линии',
      'Паром': 'Морское сообщение'
    };
    return info[type] || '';
  };

  const getAccommodationInfo = (type) => {
    const info = {
      'Отели': 'От бюджетных до премиум',
      'Airbnb': 'Апартаменты и комнаты'
    };
    return info[type] || '';
  };

  const getTimeIcon = (time) => {
    const hour = parseInt(time?.split(':')[0] || '0');
    if (hour >= 6 && hour < 18) {
      return <FaSun className="time-icon day" />;
    }
    return <FaMoon className="time-icon night" />;
  };

  const cities = {
    FRANCE: [
      {
        name: 'Париж',
        description: 'Столица Франции, город любви и искусства',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 200€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 120€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 80€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 150€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 80€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Ницца',
        description: 'Жемчужина Лазурного берега',
        image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 180€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 100€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 70€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 130€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 70€/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      }
    ],
    ITALY: [
      {
        name: 'Рим',
        description: 'Вечный город, столица Италии',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 190€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 110€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 75€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 140€/ночь', icon: <FaHotel />, rating: '4.6' },
          { type: 'Airbnb', price: 'от 75€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      },
      {
        name: 'Венеция',
        description: 'Город на воде, жемчужина Адриатики',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 185€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 105€', icon: <FaTrain /> },
          { type: 'Паром', price: 'от 40€', icon: <FaShip /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 160€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 85€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      }
    ],
    SPAIN: [
      {
        name: 'Барселона',
        description: 'Столица Каталонии, город Гауди',
        image: 'https://images.unsplash.com/photo-1583426573939-97d09302d76a?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 175€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 95€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 65€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 120€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 70€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Мадрид',
        description: 'Столица Испании, город искусства и культуры',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 180€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 100€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 70€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 130€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 75€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    GERMANY: [
      {
        name: 'Берлин',
        description: 'Столица Германии, город истории и современности',
        image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 170€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 90€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 60€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 110€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 65€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Мюнхен',
        description: 'Столица Баварии, город пива и традиций',
        image: 'https://images.unsplash.com/photo-1577460551100-907ba84418ce?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 165€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 85€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 55€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 120€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 70€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    GREECE: [
      {
        name: 'Афины',
        description: 'Столица Греции, колыбель цивилизации',
        image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 160€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 80€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 50€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 100€/ночь', icon: <FaHotel />, rating: '4.3' },
          { type: 'Airbnb', price: 'от 60€/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      },
      {
        name: 'Санторини',
        description: 'Остров вулканического происхождения, рай для фотографов',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 190€', icon: <FaPlane /> },
          { type: 'Паром', price: 'от 45€', icon: <FaShip /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 150€/ночь', icon: <FaHotel />, rating: '4.7' },
          { type: 'Airbnb', price: 'от 90€/ночь', icon: <FaAirbnb />, rating: '4.5' }
        ]
      }
    ],
    NETHERLANDS: [
      {
        name: 'Амстердам',
        description: 'Столица Нидерландов, город каналов и велосипедов',
        image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 180€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 95€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 65€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 140€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 85€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      },
      {
        name: 'Роттердам',
        description: 'Крупнейший порт Европы, город современной архитектуры',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 170€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 90€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 60€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 120€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 75€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      }
    ],
    UKRAINE: [
      {
        name: 'Киев',
        description: 'Столица Украины, город золотых куполов',
        image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 4500₴', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 2000₴', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 1500₴', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 2500₴/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 1500₴/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Львов',
        description: 'Культурная столица Украины, город кофе и шоколада',
        image: 'https://images.unsplash.com/photo-1582647509711-c8aa8a8bef96?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 4000₴', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 1800₴', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 1200₴', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 2000₴/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 1200₴/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    POLAND: [
      {
        name: 'Варшава',
        description: 'Столица Польши, современный город с богатой историей',
        image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 800zł', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 400zł', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 300zł', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 500zł/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 300zł/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Краков',
        description: 'Культурная столица Польши, город замков и легенд',
        image: 'https://images.unsplash.com/photo-1573744364765-f9c8bca639e3?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 700zł', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 350zł', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 250zł', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 450zł/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 280zł/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    PORTUGAL: [
      {
        name: 'Лиссабон',
        description: 'Столица Португалии, город на семи холмах',
        image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 150€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 80€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 50€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 100€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 60€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Порту',
        description: 'Второй по величине город Португалии, родина портвейна',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 140€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 75€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 45€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 90€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 55€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    CROATIA: [
      {
        name: 'Загреб',
        description: 'Столица Хорватии, город музеев и галерей',
        image: 'https://images.unsplash.com/photo-1596097155664-4f5c49ba1b69?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 160€', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 85€', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 55€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 100€/ночь', icon: <FaHotel />, rating: '4.3' },
          { type: 'Airbnb', price: 'от 60€/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      },
      {
        name: 'Дубровник',
        description: 'Жемчужина Адриатики, город-крепость',
        image: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 180€', icon: <FaPlane /> },
          { type: 'Паром', price: 'от 45€', icon: <FaShip /> },
          { type: 'Автобус', price: 'от 60€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 120€/ночь', icon: <FaHotel />, rating: '4.6' },
          { type: 'Airbnb', price: 'от 75€/ночь', icon: <FaAirbnb />, rating: '4.4' }
        ]
      }
    ],
    MALTA: [
      {
        name: 'Валлетта',
        description: 'Столица Мальты, город рыцарей',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 170€', icon: <FaPlane /> },
          { type: 'Паром', price: 'от 50€', icon: <FaShip /> },
          { type: 'Автобус', price: 'от 40€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 110€/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 70€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Мдина',
        description: 'Древняя столица Мальты, молчаливый город',
        image: 'https://images.unsplash.com/photo-1593352216894-89108fc6c574?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 170€', icon: <FaPlane /> },
          { type: 'Автобус', price: 'от 35€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 100€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 65€/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      }
    ],
    HUNGARY: [
      {
        name: 'Будапешт',
        description: 'Столица Венгрии, город термальных купален',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 45000Ft', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 25000Ft', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 15000Ft', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 30000Ft/ночь', icon: <FaHotel />, rating: '4.5' },
          { type: 'Airbnb', price: 'от 20000Ft/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      },
      {
        name: 'Дебрецен',
        description: 'Второй по величине город Венгрии, культурный центр',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 40000Ft', icon: <FaPlane /> },
          { type: 'Поезд', price: 'от 20000Ft', icon: <FaTrain /> },
          { type: 'Автобус', price: 'от 12000Ft', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 25000Ft/ночь', icon: <FaHotel />, rating: '4.3' },
          { type: 'Airbnb', price: 'от 15000Ft/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      }
    ],
    CYPRUS: [
      {
        name: 'Никосия',
        description: 'Столица Кипра, последняя разделенная столица в мире',
        image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 160€', icon: <FaPlane /> },
          { type: 'Автобус', price: 'от 40€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 90€/ночь', icon: <FaHotel />, rating: '4.3' },
          { type: 'Airbnb', price: 'от 55€/ночь', icon: <FaAirbnb />, rating: '4.2' }
        ]
      },
      {
        name: 'Лимассол',
        description: 'Курортный город, центр туризма и бизнеса',
        image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=800&q=80',
        transport: [
          { type: 'Самолет', price: 'от 170€', icon: <FaPlane /> },
          { type: 'Автобус', price: 'от 35€', icon: <FaBus /> }
        ],
        accommodation: [
          { type: 'Отели', price: 'от 100€/ночь', icon: <FaHotel />, rating: '4.4' },
          { type: 'Airbnb', price: 'от 65€/ночь', icon: <FaAirbnb />, rating: '4.3' }
        ]
      }
    ]
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Города {country}</h2>
        <div className="cities-container">
          {cities[country]?.map((city, index) => {
            const isFavorite = favorites.includes(city.name);
            const isExpanded = expandedInfo[city.name];
            const isMapShown = showMap[city.name];
            const coords = cityCoordinates[city.name];
            const cityWeather = weatherData[city.name];
            const cityTime = cityTimes[city.name];
            
            return (
              <div key={index} className="city-card">
                <div className="city-image-container">
                  <img src={city.image} alt={city.name} />
                  <div className="city-actions">
                    <button 
                      className={`action-button favorite ${isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(city.name)}
                      title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                    >
                      <FaHeart />
                    </button>
                    <button 
                      className="action-button"
                      onClick={() => shareCity(city.name)}
                      title="Поделиться"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>
                
                <div className="city-info">
                  <div className="city-title">
                    {getCityIcon(city.name)}
                    <h3>{city.name}</h3>
                  </div>
                  <p className="city-description">{city.description}</p>
                  
                  {isExpanded && (
                    <div className="additional-info">
                      {cityWeather ? (
                        <div className="weather-info-container">
                          <div className="info-row weather-main">
                            <div className="weather-icon">
                              {getWeatherIcon(cityWeather.weatherCode)}
                            </div>
                            <div className="weather-details">
                              <span className="temperature">{cityWeather.temp}°C</span>
                              <span className="description">{cityWeather.description}</span>
                            </div>
                          </div>
                          <div className="weather-extra-info">
                            <div className="info-row">
                              <FaTemperatureHigh />
                              <span>Ощущается как {cityWeather.feels_like}°C</span>
                            </div>
                            <div className="info-row">
                              <FaWind />
                              <span>Ветер {cityWeather.wind} м/с</span>
                            </div>
                            <div className="info-row">
                              <FaCloud />
                              <span>Влажность {cityWeather.humidity}%</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="info-row">
                          <FaTemperatureHigh />
                          <span>Загрузка погоды...</span>
                        </div>
                      )}
                      
                      {cityTime ? (
                        <div className="time-info-container">
                          <div className="info-row time-main">
                            <div className="time-icon-container">
                              {getTimeIcon(cityTime.time)}
                            </div>
                            <div className="time-details">
                              <span className="current-time">{cityTime.time}</span>
                              <span className="current-date">{cityTime.date}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="info-row">
                          <FaClock />
                          <span>Загрузка времени...</span>
                        </div>
                      )}
                      
                      <div 
                        className="info-row clickable"
                        onClick={() => toggleMap(city.name)}
                        title="Нажмите, чтобы показать/скрыть карту"
                      >
                        <FaMapMarkerAlt />
                        <span>Центр города</span>
                      </div>
                      
                      {isMapShown && coords && (
                        <div className="map-container">
                          <iframe
                            title={`Карта ${city.name}`}
                            width="100%"
                            height="200"
                            frameBorder="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${coords.lat},${coords.lng}&zoom=13`}
                            allowFullScreen
                          />
                          <button 
                            className="open-maps-button"
                            onClick={() => openGoogleMaps(city.name)}
                          >
                            Открыть в Google Maps
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="info-section">
                    <h4>Транспорт:</h4>
                    {city.transport.map((option, idx) => (
                      <TransportOption
                        key={idx}
                        city={city.name}
                        type={option.type}
                        price={option.price}
                      />
                    ))}
                  </div>
                  
                  <div className="info-section">
                    <h4>Проживание:</h4>
                    {city.accommodation.map((option, idx) => (
                      <AccommodationOption
                        key={idx}
                        city={city.name}
                        type={option.type}
                        price={option.price}
                        rating={option.rating}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="more-info-button"
                    onClick={() => toggleExpandedInfo(city.name)}
                  >
                    {isExpanded ? 'Скрыть детали' : 'Подробнее'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CityModal; 