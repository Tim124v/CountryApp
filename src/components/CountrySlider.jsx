import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaHotel, FaPlane, FaAirbnb } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import './CountrySlider.css';

const countries = [
  {
    name: 'FRANCE',
    flag: '🇫🇷',
    mapCoordinates: { lat: 46.227638, lng: 2.213749 },
    description: 'Почувствуйте магию Парижа и очарование французской культуры. Страна изысканной кухни, высокой моды и романтики. Здесь каждый уголок пропитан историей и искусством.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Paris',
    info: {
      capital: 'Париж',
      population: '67.39 млн',
      language: 'Французский',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'День взятия Бастилии', 
        date: '14 июля', 
        location: 'Париж',
        description: 'Главный национальный праздник Франции, отмечающий годовщину взятия Бастилии в 1789 году.'
      },
      { 
        name: 'Каннский кинофестиваль', 
        date: '14-25 мая', 
        location: 'Канны',
        description: 'Один из самых престижных кинофестивалей мира.'
      },
      { 
        name: 'Фестиваль света', 
        date: '8-11 декабря', 
        location: 'Лион',
        description: 'Потрясающее световое шоу, превращающее исторические здания Лиона в произведения светового искусства.'
      }
    ],
    landmarks: [
      {
        name: 'Эйфелева башня',
        location: 'Париж',
        image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400&q=80',
        description: 'Символ Парижа высотой 324 метра, построенный в 1889 году.'
      },
      {
        name: 'Лувр',
        location: 'Париж',
        image: 'https://images.unsplash.com/photo-1544413660-299165566b1d?w=400&q=80',
        description: 'Крупнейший художественный музей мира.'
      },
      {
        name: 'Версаль',
        location: 'Версаль',
        image: 'https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?w=400&q=80',
        description: 'Роскошный дворцово-парковый ансамбль.'
      }
    ]
  },
  {
    name: 'ITALY',
    flag: '🇮🇹',
    mapCoordinates: { lat: 41.9028, lng: 12.4964 },
    description: 'Откройте для себя страну искусства, истории и изысканной кухни. Родина Ренессанса, оперы и непревзойденной пасты.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Rome',
    info: {
      capital: 'Рим',
      population: '60.36 млн',
      language: 'Итальянский',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'Венецианский карнавал', 
        date: 'февраль', 
        location: 'Венеция',
        description: 'Знаменитый карнавал масок, история которого насчитывает более 900 лет.'
      },
      { 
        name: 'Римский кинофестиваль', 
        date: 'октябрь', 
        location: 'Рим',
        description: 'Международный кинофестиваль, представляющий новинки мирового кинематографа.'
      },
      { 
        name: 'Palio di Siena', 
        date: '2 июля и 16 августа', 
        location: 'Сиена',
        description: 'Традиционные скачки на главной площади Сиены.'
      }
    ],
    landmarks: [
      {
        name: 'Колизей',
        location: 'Рим',
        image: 'https://images.unsplash.com/photo-1552432424-0e3c4e9b8aa1?w=400&q=80',
        description: 'Древний амфитеатр, символ Римской империи.'
      },
      {
        name: 'Собор Святого Петра',
        location: 'Ватикан',
        image: 'https://images.unsplash.com/photo-1570681662977-a1b5ec0d8d0f?w=400&q=80',
        description: 'Главный храм католического мира.'
      },
      {
        name: 'Венецианские каналы',
        location: 'Венеция',
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80',
        description: 'Уникальная система водных каналов.'
      }
    ]
  },
  {
    name: 'SPAIN',
    flag: '🇪🇸',
    mapCoordinates: { lat: 40.4168, lng: -3.7038 },
    description: 'Погрузитесь в страстную культуру фламенко и тапас. Страна солнца, сиесты и жизнерадостных людей.',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Madrid',
    info: {
      capital: 'Мадрид',
      population: '47.35 млн',
      language: 'Испанский',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'La Tomatina', 
        date: 'последняя среда августа', 
        location: 'Буньоль',
        description: 'Знаменитая томатная битва.'
      },
      { 
        name: 'San Fermín', 
        date: '6-14 июля', 
        location: 'Памплона',
        description: 'Фестиваль, известный забегом быков.'
      },
      { 
        name: 'La Feria de Abril', 
        date: 'апрель', 
        location: 'Севилья',
        description: 'Весенняя ярмарка с фламенко и конными шоу.'
      }
    ],
    landmarks: [
      {
        name: 'Саграда Фамилия',
        location: 'Барселона',
        image: 'https://images.unsplash.com/photo-1583779457094-ab6c595a1f16?w=600&q=80',
        description: 'Уникальный собор Гауди.'
      },
      {
        name: 'Альгамбра',
        location: 'Гранада',
        image: 'https://images.unsplash.com/photo-1591792111137-5b8d3b4d7fd3?w=600&q=80',
        description: 'Древний мавританский дворец-крепость.'
      },
      {
        name: 'Прадо',
        location: 'Мадрид',
        image: 'https://images.unsplash.com/photo-1563889362352-b0594b38f4b5?w=600&q=80',
        description: 'Один из крупнейших художественных музеев.'
      }
    ]
  },
  {
    name: 'GERMANY',
    flag: '🇩🇪',
    mapCoordinates: { lat: 51.1657, lng: 10.4515 },
    description: 'Исследуйте страну замков, пива и технологических инноваций. Здесь средневековая архитектура соседствует с ультрасовременным дизайном, а традиционные фестивали собирают гостей со всего мира.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Berlin',
    info: {
      capital: 'Берлин',
      population: '83.12 млн',
      language: 'Немецкий',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'Октоберфест', 
        date: '16 сентября - 3 октября', 
        location: 'Мюнхен',
        description: 'Крупнейший в мире фестиваль пива и народных гуляний. Ежегодно привлекает более 6 миллионов посетителей. Традиция началась со свадьбы баварского кронпринца в 1810 году.'
      },
      { 
        name: 'Рождественские ярмарки', 
        date: '25 ноября - 24 декабря', 
        location: 'По всей стране',
        description: 'Волшебные рождественские базары с глинтвейном, традиционными сладостями и ремесленными изделиями. Самые известные проходят в Нюрнберге и Дрездене.'
      },
      { 
        name: 'Берлинский кинофестиваль', 
        date: 'февраль', 
        location: 'Берлин',
        description: 'Один из трёх самых престижных кинофестивалей мира, известный как Берлинале. Главный приз - "Золотой медведь".'
      },
    ],
    landmarks: [
      {
        name: 'Замок Нойшванштайн',
        location: 'Бавария',
        image: 'https://images.unsplash.com/photo-1534313314376-a72289b6181e',
        description: 'Сказочный замок короля Людвига II, вдохновивший создателей Диснейленда.'
      },
      {
        name: 'Бранденбургские ворота',
        location: 'Берлин',
        image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc',
        description: 'Символ объединения Германии, одна из главных достопримечательностей Берлина.'
      },
      {
        name: 'Кёльнский собор',
        location: 'Кёльн',
        image: 'https://images.unsplash.com/photo-1578327307847-34d61c311940',
        description: 'Готический собор, строившийся более 600 лет. Самое посещаемое место в Германии.'
      }
    ]
  },
  {
    name: 'GREECE',
    flag: '🇬🇷',
    mapCoordinates: { lat: 37.9838, lng: 23.7275 },
    description: 'Откройте колыбель европейской цивилизации. Страна древних мифов, философии и демократии. Кристально чистые воды Эгейского моря омывают тысячи островов с уникальной культурой.',
    image: 'https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Athens',
    info: {
      capital: 'Афины',
      population: '10.72 млн',
      language: 'Греческий',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'Апокриес (Карнавал)', 
        date: 'февраль-март', 
        location: 'Афины, Патры',
        description: 'Трехнедельный карнавал перед началом Великого поста. Особенно ярко празднуется в Патрах, где проходят красочные парады и маскарады.'
      },
      { 
        name: 'Фестиваль Афин и Эпидавра', 
        date: 'июнь-август', 
        location: 'Афины, Эпидавр',
        description: 'Крупнейший фестиваль искусств в Греции. Театральные постановки проходят в древнем театре Эпидавра с уникальной акустикой.'
      },
      { 
        name: 'День Охи', 
        date: '28 октября', 
        location: 'По всей стране',
        description: 'Национальный праздник в честь отказа Греции от ультиматума Муссолини в 1940 году. Проводятся военные парады и патриотические мероприятия.'
      },
    ],
    landmarks: [
      {
        name: 'Акрополь',
        location: 'Афины',
        image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
        description: 'Древний комплекс храмов, включая знаменитый Парфенон. Символ античной Греции.'
      },
      {
        name: 'Санторини',
        location: 'Киклады',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        description: 'Живописный остров с белоснежными домами и голубыми куполами церквей.'
      },
      {
        name: 'Метеоры',
        location: 'Фессалия',
        image: 'https://images.unsplash.com/photo-1586638382322-8ebd9200dca8',
        description: 'Монастыри на вершинах скал, построенные в XIV-XVI веках.'
      }
    ]
  },
  {
    name: 'NETHERLANDS',
    flag: '🇳🇱',
    mapCoordinates: { lat: 52.3702, lng: 4.8952 },
    description: 'Погрузитесь в атмосферу страны тюльпанов, ветряных мельниц и велосипедов. Здесь современное искусство соседствует с работами великих мастеров, а каналы создают неповторимый городской пейзаж.',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Amsterdam',
    info: {
      capital: 'Амстердам',
      population: '17.13 млн',
      language: 'Голландский',
      currency: 'Евро (€)'
    },
    festivals: [
      { 
        name: 'День Короля', 
        date: '27 апреля', 
        location: 'По всей стране',
        description: 'Главный национальный праздник Нидерландов. Вся страна окрашивается в оранжевый цвет, проводятся уличные ярмарки и концерты.'
      },
      { 
        name: 'Фестиваль тюльпанов', 
        date: 'март-май', 
        location: 'Кёкенхоф',
        description: 'Крупнейшая в мире выставка тюльпанов и других весенних цветов. Парк Кёкенхоф превращается в красочный ковер из миллионов цветов.'
      },
      { 
        name: 'Amsterdam Dance Event', 
        date: 'октябрь', 
        location: 'Амстердам',
        description: 'Крупнейший в мире фестиваль электронной музыки и конференция для профессионалов музыкальной индустрии.'
      },
    ],
    landmarks: [
      {
        name: 'Королевский дворец',
        location: 'Амстердам',
        image: 'https://images.unsplash.com/photo-1558551649-e44c8f992010',
        description: 'Бывшая ратуша, ставшая официальной резиденцией короля Нидерландов.'
      },
      {
        name: 'Парк Кёкенхоф',
        location: 'Лиссе',
        image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6',
        description: 'Знаменитый парк тюльпанов, где высаживают более 7 миллионов луковиц ежегодно.'
      },
      {
        name: 'Музей Ван Гога',
        location: 'Амстердам',
        image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22',
        description: 'Крупнейшая в мире коллекция работ великого художника.'
      }
    ]
  },
  {
    name: 'UKRAINE',
    flag: '🇺🇦',
    mapCoordinates: { lat: 48.3794, lng: 31.1656 },
    description: 'Откройте для себя богатую культуру и традиции Украины. Страна с древней историей, живописными пейзажами и гостеприимными людьми.',
    image: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Kiev',
    info: {
      capital: 'Киев',
      population: '44.13 млн',
      language: 'Украинский',
      currency: 'Гривна (₴)'
    },
    festivals: [
      {
        name: 'День Независимости',
        date: '24 августа',
        location: 'По всей стране',
        description: 'Главный государственный праздник, отмечающий независимость Украины.'
      },
      {
        name: 'Фестиваль писанки',
        date: 'апрель',
        location: 'Львов',
        description: 'Традиционный фестиваль украинских пасхальных яиц-писанок.'
      },
      {
        name: 'Сорочинская ярмарка',
        date: 'август',
        location: 'Полтавская область',
        description: 'Знаменитая традиционная ярмарка с народными гуляниями.'
      }
    ],
    landmarks: [
      {
        name: 'София Киевская',
        location: 'Киев',
        image: 'https://images.unsplash.com/photo-1586955080278-b66686de7efd?w=400&q=80',
        description: 'Древний собор XI века, объект Всемирного наследия ЮНЕСКО.'
      },
      {
        name: 'Львовская площадь Рынок',
        location: 'Львов',
        image: 'https://images.unsplash.com/photo-1582647509711-c8aa8a8bef96?w=400&q=80',
        description: 'Историческое сердце Львова с уникальной архитектурой.'
      },
      {
        name: 'Замок Паланок',
        location: 'Мукачево',
        image: 'https://images.unsplash.com/photo-1586531829902-d264cae0ce06?w=400&q=80',
        description: 'Средневековый замок XIV века на вершине горы.'
      }
    ]
  },
  {
    name: 'POLAND',
    flag: '🇵🇱',
    mapCoordinates: { lat: 51.9194, lng: 19.1451 },
    description: 'Познакомьтесь с Польшей - страной богатой истории, величественных замков и современных городов. Здесь традиции гармонично сочетаются с инновациями.',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Warsaw',
    info: {
      capital: 'Варшава',
      population: '37.95 млн',
      language: 'Польский',
      currency: 'Злотый (PLN)'
    },
    festivals: [
      {
        name: 'Вианочки',
        date: '21 июня',
        location: 'Краков',
        description: 'Традиционный фестиваль летнего солнцестояния.'
      },
      {
        name: 'Фестиваль еврейской культуры',
        date: 'июль',
        location: 'Краков',
        description: 'Один из крупнейших фестивалей еврейской культуры в Европе.'
      },
      {
        name: 'Познаньский фестиваль',
        date: 'июнь',
        location: 'Познань',
        description: 'Международный музыкальный фестиваль.'
      }
    ],
    landmarks: [
      {
        name: 'Вавельский замок',
        location: 'Краков',
        image: 'https://images.unsplash.com/photo-1573744364765-f9c8bca639e3?w=400&q=80',
        description: 'Королевский замок, символ польской государственности.'
      },
      {
        name: 'Старый город Варшавы',
        location: 'Варшава',
        image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400&q=80',
        description: 'Восстановленный исторический центр столицы.'
      },
      {
        name: 'Величка',
        location: 'Величка',
        image: 'https://images.unsplash.com/photo-1574335311949-ade68e73a1e6?w=400&q=80',
        description: 'Древняя соляная шахта с уникальными подземными залами.'
      }
    ]
  },
  {
    name: 'PORTUGAL',
    flag: '🇵🇹',
    mapCoordinates: { lat: 39.3999, lng: -8.2245 },
    description: 'Откройте для себя Португалию - страну мореплавателей, живописных побережий и богатого культурного наследия. Здесь каждый найдет что-то особенное.',
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Lisbon',
    info: {
      capital: 'Лиссабон',
      population: '10.3 млн',
      language: 'Португальский',
      currency: 'Евро (€)'
    },
    festivals: [
      {
        name: 'Фестиваль Святого Антония',
        date: '13 июня',
        location: 'Лиссабон',
        description: 'Красочный праздник с парадами и народными гуляниями.'
      },
      {
        name: 'São João',
        date: '23-24 июня',
        location: 'Порту',
        description: 'Фестиваль Святого Иоанна с фейерверками и традициями.'
      },
      {
        name: 'NOS Alive',
        date: 'июль',
        location: 'Оэйраш',
        description: 'Один из крупнейших музыкальных фестивалей Европы.'
      }
    ],
    landmarks: [
      {
        name: 'Башня Белен',
        location: 'Лиссабон',
        image: 'https://images.unsplash.com/photo-1578912996078-305d92249aa6?w=400&q=80',
        description: 'Символ эпохи великих географических открытий.'
      },
      {
        name: 'Дворец Пена',
        location: 'Синтра',
        image: 'https://images.unsplash.com/photo-1591991564021-0662a8573199?w=400&q=80',
        description: 'Красочный дворец в романтическом стиле.'
      },
      {
        name: 'Мост имени 25 апреля',
        location: 'Лиссабон',
        image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=400&q=80',
        description: 'Знаменитый мост, напоминающий мост Золотые Ворота.'
      }
    ]
  },
  {
    name: 'CROATIA',
    flag: '🇭🇷',
    mapCoordinates: { lat: 45.1000, lng: 15.2000 },
    description: 'Хорватия - страна тысячи островов, кристально чистого моря и средневековых городов. Место, где история встречается с природной красотой.',
    image: 'https://images.unsplash.com/photo-1596097155664-4f5c49ba1b69?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Zagreb',
    info: {
      capital: 'Загреб',
      population: '4.05 млн',
      language: 'Хорватский',
      currency: 'Евро (€)'
    },
    festivals: [
      {
        name: 'INmusic Festival',
        date: 'июнь',
        location: 'Загреб',
        description: 'Крупнейший фестиваль под открытым небом в Хорватии.'
      },
      {
        name: 'Дубровницкий летний фестиваль',
        date: 'июль-август',
        location: 'Дубровник',
        description: 'Престижный фестиваль искусств в историческом городе.'
      },
      {
        name: 'Ultra Europe',
        date: 'июль',
        location: 'Сплит',
        description: 'Международный фестиваль электронной музыки.'
      }
    ],
    landmarks: [
      {
        name: 'Старый город Дубровника',
        location: 'Дубровник',
        image: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?w=400&q=80',
        description: 'Средневековый город-крепость, объект ЮНЕСКО.'
      },
      {
        name: 'Плитвицкие озёра',
        location: 'Национальный парк Плитвицкие озёра',
        image: 'https://images.unsplash.com/photo-1600352761482-95ab0db25f0b?w=400&q=80',
        description: 'Система из 16 озёр с водопадами.'
      },
      {
        name: 'Диоклетианов дворец',
        location: 'Сплит',
        image: 'https://images.unsplash.com/photo-1555990538-ae03cee84b67?w=400&q=80',
        description: 'Античный дворец римского императора.'
      }
    ]
  },
  {
    name: 'MALTA',
    flag: '🇲🇹',
    mapCoordinates: { lat: 35.9375, lng: 14.3754 },
    description: 'Мальта - жемчужина Средиземного моря с богатейшей историей, древними храмами и прекрасными пляжами. Место, где каждый камень хранит историю тысячелетий.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Malta',
    info: {
      capital: 'Валлетта',
      population: '514.000',
      language: 'Мальтийский, Английский',
      currency: 'Евро (€)'
    },
    festivals: [
      {
        name: 'Malta Jazz Festival',
        date: 'июль',
        location: 'Валлетта',
        description: 'Международный джазовый фестиваль под открытым небом.'
      },
      {
        name: 'Фестиваль фейерверков',
        date: 'апрель-май',
        location: 'Валлетта',
        description: 'Международный конкурс пиротехнического искусства.'
      },
      {
        name: 'Festa',
        date: 'лето',
        location: 'По всей стране',
        description: 'Традиционные религиозные праздники в деревнях.'
      }
    ],
    landmarks: [
      {
        name: 'Собор Святого Иоанна',
        location: 'Валлетта',
        image: 'https://images.unsplash.com/photo-1602087594298-226de4a17e09?w=400&q=80',
        description: 'Шедевр барочной архитектуры XVI века.'
      },
      {
        name: 'Мдина',
        location: 'Мдина',
        image: 'https://images.unsplash.com/photo-1593352216894-89108fc6c574?w=400&q=80',
        description: 'Древняя столица Мальты, "Молчаливый город".'
      },
      {
        name: 'Голубая лагуна',
        location: 'Комино',
        image: 'https://images.unsplash.com/photo-1586447795451-8ea2e0b4921c?w=400&q=80',
        description: 'Живописная лагуна с кристально чистой водой.'
      }
    ]
  },
  {
    name: 'HUNGARY',
    flag: '🇭🇺',
    mapCoordinates: { lat: 47.1625, lng: 19.5033 },
    description: 'Венгрия - страна термальных купален, величественной архитектуры и богатых культурных традиций. Здесь история оживает в каждом уголке.',
    image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Europe/Budapest',
    info: {
      capital: 'Будапешт',
      population: '9.73 млн',
      language: 'Венгерский',
      currency: 'Форинт (HUF)'
    },
    festivals: [
      {
        name: 'Sziget Festival',
        date: 'август',
        location: 'Будапешт',
        description: 'Один из крупнейших музыкальных фестивалей Европы.'
      },
      {
        name: 'Винный фестиваль',
        date: 'сентябрь',
        location: 'Будапешт',
        description: 'Празднование венгерского виноделия.'
      },
      {
        name: 'Фестиваль цветов',
        date: 'август',
        location: 'Дебрецен',
        description: 'Красочный карнавал цветов и костюмов.'
      }
    ],
    landmarks: [
      {
        name: 'Здание Парламента',
        location: 'Будапешт',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=400&q=80',
        description: 'Величественное неоготическое здание на берегу Дуная.'
      },
      {
        name: 'Купальни Сечени',
        location: 'Будапешт',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=400&q=80',
        description: 'Крупнейший термальный комплекс Европы.'
      },
      {
        name: 'Базилика Святого Иштвана',
        location: 'Будапешт',
        image: 'https://images.unsplash.com/photo-1551867633-194f125bddfa?w=400&q=80',
        description: 'Крупнейший храм Будапешта.'
      }
    ]
  },
  {
    name: 'CYPRUS',
    flag: '🇨🇾',
    mapCoordinates: { lat: 35.1264, lng: 33.4299 },
    description: 'Кипр - остров Афродиты, где солнце светит 340 дней в году. Место встречи древних цивилизаций, кристально чистых вод и гостеприимных людей.',
    image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=1920&q=80',
    timeZone: 'Asia/Nicosia',
    info: {
      capital: 'Никосия',
      population: '1.21 млн',
      language: 'Греческий, Турецкий',
      currency: 'Евро (€)'
    },
    festivals: [
      {
        name: 'Карнавал Лимассола',
        date: 'февраль-март',
        location: 'Лимассол',
        description: 'Десятидневный карнавал с парадами и маскарадами.'
      },
      {
        name: 'Фестиваль вина',
        date: 'сентябрь',
        location: 'Лимассол',
        description: 'Празднование кипрского виноделия.'
      },
      {
        name: 'Катаклисмос',
        date: 'июнь',
        location: 'Ларнака',
        description: 'Фестиваль воды и культуры.'
      }
    ],
    landmarks: [
      {
        name: 'Замок Святого Иллариона',
        location: 'Кирения',
        image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=400&q=80',
        description: 'Средневековый замок с потрясающим видом.'
      },
      {
        name: 'Археологический парк Пафоса',
        location: 'Пафос',
        image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=400&q=80',
        description: 'Древние мозаики и руины, объект ЮНЕСКО.'
      },
      {
        name: 'Пляж Нисси',
        location: 'Айя-Напа',
        image: 'https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=400&q=80',
        description: 'Один из самых красивых пляжей острова.'
      }
    ]
  }
];

const countryToCodes = {
  'FRANCE': 'FR',
  'ITALY': 'IT',
  'SPAIN': 'ES',
  'GERMANY': 'DE',
  'GREECE': 'GR',
  'NETHERLANDS': 'NL',
  'UKRAINE': 'UA',
  'POLAND': 'PL',
  'PORTUGAL': 'PT',
  'CROATIA': 'HR',
  'MALTA': 'MT',
  'HUNGARY': 'HU',
  'CYPRUS': 'CY'
};

const countryLinks = {
  'FRANCE': {
    booking: 'https://www.booking.com/country/fr.html',
    airbnb: 'https://www.airbnb.com/france',
    airline: 'https://www.airfrance.com'
  },
  'ITALY': {
    booking: 'https://www.booking.com/country/it.html',
    airbnb: 'https://www.airbnb.com/italy',
    airline: 'https://www.ita-airways.com'
  },
  'SPAIN': {
    booking: 'https://www.booking.com/country/es.html',
    airbnb: 'https://www.airbnb.com/spain',
    airline: 'https://www.iberia.com'
  },
  'GERMANY': {
    booking: 'https://www.booking.com/country/de.html',
    airbnb: 'https://www.airbnb.com/germany',
    airline: 'https://www.lufthansa.com'
  },
  'GREECE': {
    booking: 'https://www.booking.com/country/gr.html',
    airbnb: 'https://www.airbnb.com/greece',
    airline: 'https://www.aegeanair.com'
  },
  'NETHERLANDS': {
    booking: 'https://www.booking.com/country/nl.html',
    airbnb: 'https://www.airbnb.com/netherlands',
    airline: 'https://www.klm.com'
  },
  'UKRAINE': {
    booking: 'https://www.booking.com/country/ua.html',
    airbnb: 'https://www.airbnb.com/ukraine',
    airline: 'https://www.flyuia.com'
  },
  'POLAND': {
    booking: 'https://www.booking.com/country/pl.html',
    airbnb: 'https://www.airbnb.com/poland',
    airline: 'https://www.lot.com'
  },
  'PORTUGAL': {
    booking: 'https://www.booking.com/country/pt.html',
    airbnb: 'https://www.airbnb.com/portugal',
    airline: 'https://www.flytap.com'
  },
  'CROATIA': {
    booking: 'https://www.booking.com/country/hr.html',
    airbnb: 'https://www.airbnb.com/croatia',
    airline: 'https://www.croatiaairlines.com'
  },
  'MALTA': {
    booking: 'https://www.booking.com/country/mt.html',
    airbnb: 'https://www.airbnb.com/malta',
    airline: 'https://www.airmalta.com'
  },
  'HUNGARY': {
    booking: 'https://www.booking.com/country/hu.html',
    airbnb: 'https://www.airbnb.com/hungary',
    airline: 'https://www.wizzair.com'
  },
  'CYPRUS': {
    booking: 'https://www.booking.com/country/cy.html',
    airbnb: 'https://www.airbnb.com/cyprus',
    airline: 'https://www.cyprusairways.com'
  }
};

const BookingLinks = ({ countryName }) => {
  const links = countryLinks[countryName] || {};
  
  return (
    <div className="booking-links">
      {links.booking && (
        <a 
          href={links.booking} 
          target="_blank" 
          rel="noopener noreferrer"
          className="booking-link"
          title="Забронировать отель"
        >
          <FaHotel />
        </a>
      )}
      {links.airbnb && (
        <a 
          href={links.airbnb} 
          target="_blank" 
          rel="noopener noreferrer"
          className="booking-link"
          title="Найти жильё на Airbnb"
        >
          <FaAirbnb />
        </a>
      )}
      {links.airline && (
        <a 
          href={links.airline} 
          target="_blank" 
          rel="noopener noreferrer"
          className="booking-link"
          title="Купить авиабилеты"
        >
          <FaPlane />
        </a>
      )}
    </div>
  );
};

const CountrySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const country = useMemo(() => countries[currentIndex], [currentIndex]);
  const [progress, setProgress] = useState(0);

  const updateTime = useCallback(() => {
    const time = new Date().toLocaleTimeString('ru-RU', {
      timeZone: country.timeZone,
      hour: '2-digit',
      minute: '2-digit'
    });
    setCurrentTime(time);
  }, [country.timeZone]);

  useEffect(() => {
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, [updateTime]);

  useEffect(() => {
    setProgress((currentIndex / (countries.length - 1)) * 100);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === countries.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? countries.length - 1 : prevIndex - 1
    );
  }, []);

  const ProgressBar = () => (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const SlideIndicators = () => (
    <div className="slide-indicators">
      {countries.map((_, index) => (
        <div
          key={index}
          className={`indicator ${index === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(index)}
        />
      ))}
    </div>
  );

  const LearnMoreButton = () => (
    <button className="learn-more-btn">
      Узнать больше
      <span className="arrow">→</span>
    </button>
  );

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slide active">
          <img
            src={country.image}
            alt={country.name}
            className="slide-image"
          />
          <div className="slide-content">
            <div className="main-info">
              <div className="country-header">
                <h2 className="country-name">{country.name}</h2>
                <ReactCountryFlag
                  countryCode={countryToCodes[country.name]}
                  svg
                  className="country-flag"
                />
              </div>
              <BookingLinks countryName={country.name} />
              <p className="country-tagline">{country.description}</p>
            </div>

            <div className="info-cards">
              <div className="festivals-section">
                <h3>Фестивали и праздники</h3>
                <div className="festivals-list">
                  {country.festivals.map((festival, index) => (
                    <div key={index} className="festival-item">
                      <h4>{festival.name}</h4>
                      <div className="festival-details">
                        <p className="festival-date">📅 {festival.date}</p>
                        <p className="festival-location">📍 {festival.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="landmarks-section">
                <h3>Достопримечательности</h3>
                <div className="landmarks-list">
                  {country.landmarks.map((landmark, index) => (
                    <div key={index} className="landmark-item">
                      <div className="landmark-content">
                        <h4>{landmark.name}</h4>
                        <div className="landmark-location">
                          <span>📍</span>
                          {landmark.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="navigation-buttons">
              <button className="nav-button prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              <button className="nav-button next" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProgressBar />
      <SlideIndicators />
      <LearnMoreButton />
    </div>
  );
};

export default React.memo(CountrySlider);