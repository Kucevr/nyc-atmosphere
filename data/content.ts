

export type Language = 'en' | 'ru';

export const content = {
  ru: {
    nav: {
      home: 'Главная',
      attractions: 'Места',
      neighborhoods: 'Районы',
      culture: 'Культура',
      culinary: 'Гастрономия',
      history: 'История',
      transport: 'Транспорт',
    },
    metro: {
      start: 'Начало',
      stats: 'Статистика',
      attractions: 'Места',
      neighborhoods: 'Районы',
      culture: 'Культура',
      culinary: 'Кухня',
      transport: 'Транспорт',
      history: 'История',
      grandCentral: 'Grand Central',
      dataCenter: 'Центр данных',
      landmarks: 'Достопримечательности',
      districts: 'Городские кварталы',
      artsSoul: 'Душа города',
      foodHall: 'Гастрохолл',
      transitHub: 'Транспортный узел',
      archives: 'Архивы',
      nextStop: 'След. остановка',
      inTransit: 'В пути',
      onTime: 'Вовремя',
      goodService: 'Работает штатно',
      endOfLine: 'Конец линии',
    },
    common: {
      readMore: 'Подробнее',
      close: 'Закрыть',
      viewOnMap: 'На карте',
      scroll: 'Листайте',
      est: 'Осн.',
      discover: 'Узнать',
      guide: 'Гид',
      watchVideo: 'Смотреть видео',
      explore: 'Исследовать',
      menu: 'Меню',
    },
    labels: {
      mustVisit: 'Обязательно к посещению',
      districts: 'Районы города',
      lifestyle: 'Стиль жизни',
      gastronomy: 'Кулинарный гид',
      mobility: 'Городская мобильность',
      timeline: 'Схема Истории',
      population: 'Население',
      languages: 'Языки',
      stations: 'Станции',
      buildings: 'Здания',
    },
    hero: {
      title: 'NEW YORK',
      subtitle: 'Город Мечты',
      description: 'Почувствуйте пульс мегаполиса, который диктует ритм всему миру. От ослепительного сияния Таймс-сквер до величественного спокойствия Центрального парка — это ваша история.',
    },
    stats: {
      residents: { val: '8.4M', label: 'Жителей', sub: 'Население' },
      languages: { val: '800+', label: 'Языков', sub: 'Разговорных' },
      stations:  { val: '472', label: 'Станции', sub: 'Метрополитен' },
      buildings: { val: '270', label: 'Высоток', sub: 'Небоскребы' },
    },
    about: {
      title: 'Город, где ',
      titleHighlight: 'амбиции',
      titleSuffix: ' не знают границ',
      description: 'Нью-Йорк — это не просто точка на карте, это живой организм. Здесь переплетаются тысячи культур, рождаются мировые тренды и пишется история. Каждый район — это отдельный мир: от богемного лоска Сохо до индустриальной эстетики Бруклина.',
      parallaxTitle: 'Каменные Джунгли',
    },
    attractions: {
      title: 'Иконы Города',
      description: 'Легендарные локации, сформировавшие облик Нью-Йорка. Прикоснитесь к истории.',
      items: [
        {
          id: '1',
          name: 'Times Square',
          description: 'Эпицентр мира, где ночь ярче дня.',
          category: 'Достопримечательность',
          details: '«Перекресток мира», который никогда не спит. Таймс-сквер славится своими колоссальными цифровыми билбордами и ежегодным падением шара в канун Нового года. Это место концентрированной энергии, где жизнь бурлит 24 часа в сутки.'
        },
        {
          id: '2',
          name: 'Central Park',
          description: 'Зеленое сердце Манхэттена. Оазис спокойствия.',
          category: 'Природа',
          details: 'Шедевр ландшафтного дизайна площадью 341 гектар. Здесь находятся зоопарк, замок Бельведер и Земляничные поля. Идеальное место, чтобы замедлиться, устроить пикник на овечьем лугу или просто понаблюдать за жизнью города со стороны.'
        },
        {
          id: '3',
          name: 'Empire State',
          description: 'Король небоскребов и символ амбиций.',
          category: 'Архитектура',
          details: 'Икона стиля ар-деко, построенная всего за 410 дней. Это не просто офисное здание, а культурный феномен. Со смотровой площадки на 102-м этаже открывается панорама, от которой захватывает дух — в ясную погоду видно 5 соседних штатов.'
        },
        {
          id: '4',
          name: 'Brooklyn Bridge',
          description: 'Стальной гигант, соединяющий эпохи.',
          category: 'История',
          details: 'Один из старейших подвесных мостов США. Прогулка по его деревянному настилу на закате — обязательный ритуал. Грандиозная неоготическая конструкция из стали и гранита считается одним из главных инженерных чудес XIX века.'
        },
        {
          id: '5',
          name: 'Statue of Liberty',
          description: 'Вечный символ свободы, встречающий корабли.',
          category: 'Монумент',
          details: 'Подарок Франции к столетию американской независимости. Леди Свобода держит факел просвещения и скрижаль с датой Декларации независимости. Чтобы взглянуть на город из её короны, билеты нужно бронировать за полгода вперед.'
        },
        {
          id: '6',
          name: 'The Met',
          description: 'Храм искусства на Пятой авеню.',
          category: 'Искусство',
          details: 'Метрополитен-музей хранит более 2 миллионов экспонатов: от древнеегипетских храмов до кутюра XX века. Знаменитые ступени музея — это не просто вход, а главная светская сцена города во время Met Gala.'
        }
      ]
    },
    neighborhoods: {
      title: 'Районы с Характером',
      items: [
        {
          name: "SoHo",
          tagline: "Мода и Чугун",
          desc: "Мощеные улицы, знаменитые чугунные фасады и лучшие бутики планеты.",
          details: "SoHo (South of Houston) — это музей архитектуры под открытым небом и рай для шопоголиков. Бывшие текстильные фабрики превратились в просторные лофты и галереи, создав уникальный богемно-буржуазный вайб."
        },
        {
          name: "DUMBO",
          tagline: "Арт у Воды",
          desc: "Кинематографичные виды на мосты и старинные склады Бруклина.",
          details: "Район, где индустриальное прошлое встретилось с хипстерским настоящим. Прогуляйтесь по набережной парка у Бруклинского моста, покатайтесь на винтажной карусели Джейн и сделайте то самое фото Манхэттенского моста."
        },
        {
          name: "Greenwich Village",
          tagline: "Джаз и Богема",
          desc: "Извилистые улочки, уютные таунхаусы и дух свободы 60-х.",
          details: "Колыбель контркультуры и битников. Здесь нет строгой сетки улиц, зато есть лучшие джаз-клубы мира (Blue Note, Village Vanguard) и парк Вашингтон-сквер, где всегда играют музыканты и кипит жизнь."
        },
        {
          name: "Chinatown",
          tagline: "Вкус Азии",
          desc: "Лабиринт улиц, яркие вывески и лучшие димсамы в городе.",
          details: "Один из старейших китайских кварталов Запада. Место сенсорной перегрузки: утки по-пекински в витринах, экзотические фрукты и аутентичные чайные. Здесь Нью-Йорк говорит на кантонском диалекте."
        },
        {
          name: "Williamsburg",
          tagline: "Инди-Столица",
          desc: "Винтажные маркеты, крафтовое пиво и лучшие руфтопы.",
          details: "Бруклинский район, задающий мировые тренды. Бывшие склады стали модными отелями и ресторанами. Domino Park на месте сахарной фабрики — идеальная локация для встречи заката с видом на Ист-Ривер."
        },
        {
          name: "Harlem",
          tagline: "Душа и Ритм",
          desc: "Наследие джаза, соул-фуд и легендарный театр Apollo.",
          details: "Исторический центр афроамериканской культуры. Здесь чувствуется энергия «Гарлемского ренессанса». Обязательно посетите воскресную госпел-службу и попробуйте лучшую жареную курицу в городе."
        },
        {
          name: "Chelsea",
          tagline: "Галереи и Парки",
          desc: "Мировой центр современного искусства и парк High Line.",
          details: "Челси — это сотни бесплатных галерей в бывших гаражах. А над улицами парит High Line — уникальный парк, разбитый на заброшенной железнодорожной эстакаде, изменивший урбанистику города."
        },
        {
          name: "Upper East Side",
          tagline: "Роскошь и Музеи",
          desc: "Элегантность старых денег, швейцары в ливреях и Музейная миля.",
          details: "Синоним богатства и престижа. Здесь, вдоль Пятой авеню, расположена Музейная миля (Метрополитен, Гуггенхайм) и самые дорогие особняки города. Атмосфера классического Нью-Йорка из фильмов Вуди Аллена."
        }
      ]
    },
    culture: {
      title: 'Культурный Код',
      description: 'Искусство здесь не прячется в музеях — оно разлито в воздухе, от бродвейских сцен до уличных граффити.',
      broadway: {
        title: 'Бродвей',
        desc: 'Театральное сердце мира. 41 сцена, где каждый вечер творится магия.'
      },
      fashion: {
        title: 'Мода',
        desc: 'Подиумы Пятой авеню и бутики Сохо. Мировая столица стиля.'
      },
      jazz: {
        title: 'Джаз',
        desc: 'Саксофон в Blue Note и импровизации в подвалах Village Vanguard.'
      },
      museums: {
        title: 'Музеи',
        desc: 'Met, MoMA, Guggenheim. Сокровищницы мировой цивилизации.'
      },
      nightlife: {
        title: 'Ритм Ночи',
        desc: 'От секретных спикизи-баров до техно-рейвов в Бруклине.'
      }
    },
    culinary: {
      title: 'Вкус Мегаполиса',
      quote: '"Нью-Йорк — единственный город в мире, где в 3 часа ночи можно поесть вкуснее, чем дома."',
      cta: 'Гиды Michelin →',
      items: [
        {
          name: "NY Пицца",
          desc: "Тонкая, хрустящая, огромная. Складывай слайс пополам и наслаждайся."
        },
        {
          name: "Бейгл",
          desc: "Культ завтрака. Плотный, вареный в воде перед выпечкой, с крем-чизом и лососем."
        },
        {
          name: "Чизкейк",
          desc: "Классический «Нью-Йорк»: плотный, сливочный, с нотками ванили."
        },
        {
          name: "Хот-дог",
          desc: "Уличная классика с тележки. Горчица, квашеная капуста и луковый соус."
        }
      ]
    },
    history: {
      title: 'Карта Времени',
      tracks: [
        { id: 1, name: 'Общество', color: '#ee352e' }, // Red (1/2/3)
        { id: 2, name: 'Инфраструктура', color: '#0039a6' }, // Blue (A/C/E)
        { id: 3, name: 'Культура', color: '#fccc0a' } // Yellow (N/Q/R)
      ],
      events: [
        { year: '1624', track: 1, title: 'Новый Амстердам', desc: 'Голландские поселенцы основывают торговый форпост на Манхэттене.' },
        { year: '1664', track: 1, title: 'Британское правление', desc: 'Город захвачен англичанами и переименован в Нью-Йорк.' },
        { year: '1776', track: 1, title: 'Битва за Бруклин', desc: 'Крупнейшее сражение войны за независимость США.' },
        { year: '1811', track: 2, title: 'Генеральный план', desc: 'Утверждена знаменитая сетка улиц и авеню (The Grid).' },
        { year: '1883', track: 2, title: 'Бруклинский мост', desc: 'Восьмое чудо света связывает два великих города.' },
        { year: '1886', track: 1, title: 'Статуя Свободы', desc: 'Открытие подарка Франции, символа надежды для иммигрантов.' },
        { year: '1904', track: 2, title: 'Первое метро', desc: 'Линия IRT запускается от City Hall до 145-й улицы.' },
        { year: '1920', track: 3, title: 'Эпоха Джаза', desc: 'Расцвет Гарлемского ренессанса и подпольных спикизи.' },
        { year: '1931', track: 2, title: 'Эмпайр Стейт', desc: 'Гонка небоскребов достигает пика. 102 этажа за 410 дней.' },
        { year: '1969', track: 1, title: 'Стоунволл', desc: 'Беспорядки, положившие начало движению за права ЛГБТ.' },
        { year: '1973', track: 3, title: 'Рождение Хип-Хопа', desc: 'Вечеринка DJ Kool Herc в Бронксе меняет музыку навсегда.' },
        { year: '1977', track: 1, title: 'Блэкаут', desc: '25 часов тьмы, хаоса и легендарного культурного сдвига.' },
        { year: '2001', track: 1, title: '9/11', desc: 'День, который изменил мир. Город показывает невероятную стойкость.' },
        { year: '2009', track: 3, title: 'High Line', desc: 'Открытие парка на заброшенной ж/д ветке как символ урбанистики.' },
        { year: '2014', track: 2, title: 'One WTC', desc: 'Башня Свободы возвращает скайлайн Манхэттена.' },
      ]
    },
    transport: {
      title: 'В Движении',
      description: 'Система, которая никогда не спит. Выберите свой ритм.',
      items: [
        {
          id: 'subway',
          title: 'MTA Subway',
          desc: 'Кровеносная система города.',
          price: '$2.90',
          status: '24/7',
          tip: 'Используйте OMNY на турникетах. Избегайте пустых вагонов.',
          image: '/items/MTA_Subway.JPG'
        },
        {
          id: 'taxi',
          title: 'Yellow Cab',
          desc: 'Икона улиц Манхэттена.',
          price: '$3.00+',
          status: 'On Demand',
          tip: 'Зеленые такси ездят только в верхнем Манхэттене и боро.',
          image: '/items/Yellow_Cab.JPG'
        },
        {
          id: 'walk',
          title: 'Пешком',
          desc: 'Лучший способ увидеть детали.',
          price: 'Free',
          status: 'Всегда',
          tip: 'Авеню длинные, улицы короткие. 20 блоков ~ 1 миля.',
          image: '/items/Walking.JPG'
        }
      ]
    },
    footer: {
      about: 'О проекте',
      contacts: 'Контакты',
      privacy: 'Конфиденциальность',
      madeWith: 'Сделано с',
      for: 'для влюбленных в NYC',
      subscribeTitle: 'Держите руку на пульсе',
      subscribeDesc: 'Еженедельные гиды, скрытые локации и афиша событий.',
      emailPlaceholder: 'Ваш email',
      subscribeBtn: 'Подписаться',
      links: {
        explore: 'Исследовать',
        connect: 'Связь',
        legal: 'Инфо'
      },
      time: 'Время в NYC',
      backToTop: 'Наверх',
      terms: 'Условия использования',
      sitemap: 'Карта сайта',
      weather: 'Погода',
      weatherCondition: 'Ясно',
      crowd: 'Людей на Таймс-сквер',
    }
  },
  en: {
    nav: {
      home: 'Home',
      attractions: 'Attractions',
      neighborhoods: 'Neighborhoods',
      culture: 'Culture',
      culinary: 'Culinary',
      history: 'History',
      transport: 'Transport',
    },
    metro: {
      start: 'Start',
      stats: 'Stats',
      attractions: 'Must See',
      neighborhoods: 'Explore',
      culture: 'Culture',
      culinary: 'Culinary',
      transport: 'Transport',
      history: 'History',
      grandCentral: 'Grand Central',
      dataCenter: 'Data Center',
      landmarks: 'Landmarks',
      districts: 'Districts',
      artsSoul: 'Arts & Soul',
      foodHall: 'Food Hall',
      transitHub: 'Transit Hub',
      archives: 'Archives',
      nextStop: 'Next Stop',
      inTransit: 'In Transit',
      onTime: 'On Time',
      goodService: 'Good Service',
      endOfLine: 'End of Line',
    },
    common: {
      readMore: 'Read More',
      close: 'Close',
      viewOnMap: 'View on Map',
      scroll: 'Scroll',
      est: 'Est.',
      discover: 'Discover',
      guide: 'Guide',
      watchVideo: 'Watch Film',
      explore: 'Start Exploring',
      menu: 'Menu',
    },
    labels: {
      mustVisit: 'Must Visit Icons',
      districts: 'Boroughs & Areas',
      lifestyle: 'Cultural Pulse',
      gastronomy: 'Gastronomy Guide',
      mobility: 'Urban Mobility',
      timeline: 'History Map',
      population: 'Population',
      languages: 'Languages',
      stations: 'Stations',
      buildings: 'Buildings',
    },
    hero: {
      title: 'NEW YORK',
      subtitle: 'City of Dreams',
      description: 'Feel the rhythm of the metropolis that sets the pace for the world. From the dazzling lights of Times Square to the majestic serenity of Central Park — this is your story.',
    },
    stats: {
      residents: { val: '8.4M', label: 'Residents', sub: 'Population' },
      languages: { val: '800+', label: 'Languages', sub: 'Spoken' },
      stations:  { val: '472', label: 'Stations', sub: 'Subway System' },
      buildings: { val: '270', label: 'High-Rises', sub: 'Skyscrapers' },
    },
    about: {
      title: 'The City Where ',
      titleHighlight: 'Ambition',
      titleSuffix: ' Knows No Bounds',
      description: 'New York is not just a dot on a map; it is a living organism. Thousands of cultures intertwine here, global trends are born, and history is written. Every neighborhood is a world of its own: from the bohemian chic of SoHo to the industrial aesthetic of Brooklyn.',
      parallaxTitle: 'Concrete Jungle',
    },
    attractions: {
      title: 'City Icons',
      description: 'The legendary locations that shaped New York\'s identity. Touch the history.',
      items: [
        {
          id: '1',
          name: 'Times Square',
          description: 'The center of the world where night is brighter than day.',
          category: 'Landmark',
          details: 'The "Crossroads of the World" that never sleeps. Times Square is famous for its colossal digital billboards and the annual New Year\'s Eve ball drop. It is a place of concentrated energy where life buzzes 24/7.'
        },
        {
          id: '2',
          name: 'Central Park',
          description: 'Manhattan\'s green heart. An oasis of calm.',
          category: 'Nature',
          details: 'A masterpiece of landscape design spanning 843 acres. It houses a zoo, Belvedere Castle, and Strawberry Fields. The perfect place to slow down, have a picnic on Sheep Meadow, or simply watch city life go by.'
        },
        {
          id: '3',
          name: 'Empire State',
          description: 'King of skyscrapers and symbol of ambition.',
          category: 'Architecture',
          details: 'An Art Deco icon built in just 410 days. It\'s not just an office building, but a cultural phenomenon. The observation deck on the 102nd floor offers a breathtaking panorama — seeing 5 neighboring states on a clear day.'
        },
        {
          id: '4',
          name: 'Brooklyn Bridge',
          description: 'A steel giant connecting eras.',
          category: 'History',
          details: 'One of the oldest suspension bridges in the USA. Walking across its wooden promenade at sunset is a mandatory ritual. Its grand neo-gothic steel and granite construction is considered a 19th-century engineering marvel.'
        },
        {
          id: '5',
          name: 'Statue of Liberty',
          description: 'Eternal symbol of freedom welcoming ships.',
          category: 'Monument',
          details: 'A gift from France for America\'s centennial. Lady Liberty holds the torch of enlightenment and a tablet with the Declaration of Independence date. To see the city from her crown, tickets must be booked six months in advance.'
        },
        {
          id: '6',
          name: 'The Met',
          description: 'Temple of art on Fifth Avenue.',
          category: 'Culture',
          details: 'The Metropolitan Museum of Art holds over 2 million exhibits: from ancient Egyptian temples to 20th-century couture. The famous museum steps are not just an entrance, but the city\'s main social stage during the Met Gala.'
        }
      ]
    },
    neighborhoods: {
      title: 'Areas with Soul',
      items: [
        {
          name: "SoHo",
          tagline: "Fashion & Cast Iron",
          desc: "Cobblestone streets, famous cast-iron facades, and the planet's best boutiques.",
          details: "SoHo (South of Houston) is an open-air architecture museum and a shopaholic's paradise. Former textile factories have turned into spacious lofts and galleries, creating a unique bohemian-bourgeois vibe."
        },
        {
          name: "DUMBO",
          tagline: "Art by the Water",
          desc: "Cinematic views of bridges and vintage Brooklyn warehouses.",
          details: "The neighborhood where the industrial past meets the hipster present. Walk along the Brooklyn Bridge Park waterfront, ride Jane's vintage carousel, and take that iconic photo of the Manhattan Bridge."
        },
        {
          name: "Greenwich Village",
          tagline: "Jazz & Bohemia",
          desc: "Winding streets, cozy townhouses, and the spirit of 60s freedom.",
          details: "The cradle of counterculture and beatniks. There is no strict street grid here, but there are the world's best jazz clubs (Blue Note, Village Vanguard) and Washington Square Park, where musicians always play and life buzzes."
        },
        {
          name: "Chinatown",
          tagline: "Taste of Asia",
          desc: "A labyrinth of streets, bright signs, and the best dim sum in town.",
          details: "One of the West's oldest Chinatowns. A place of sensory overload: Peking ducks in windows, exotic fruits, and authentic tea houses. Here, New York speaks Cantonese."
        },
        {
          name: "Williamsburg",
          tagline: "Indie Capital",
          desc: "Vintage markets, craft beer, and the best rooftops.",
          details: "The Brooklyn neighborhood setting global trends. Former warehouses have become trendy hotels and restaurants. Domino Park on the site of a sugar factory is the perfect location to catch the sunset overlooking the East River."
        },
        {
          name: "Harlem",
          tagline: "Soul & Rhythm",
          desc: "Jazz heritage, soul food, and the legendary Apollo Theater.",
          details: "The historic center of African American culture. You can feel the energy of the 'Harlem Renaissance' here. Be sure to attend a Sunday gospel service and try the best fried chicken in the city."
        },
        {
          name: "Chelsea",
          tagline: "Galleries & Parks",
          desc: "Global center of contemporary art and the High Line park.",
          details: "Chelsea is hundreds of free galleries in former garages. And floating above the streets is the High Line — a unique park built on an abandoned railway viaduct that changed the city's urbanism."
        },
        {
          name: "Upper East Side",
          tagline: "Luxury & Museums",
          desc: "Old money elegance, liveried doormen, and Museum Mile.",
          details: "Synonymous with wealth and prestige. Here, along Fifth Avenue, lies Museum Mile (The Met, Guggenheim) and the city's most expensive mansions. The atmosphere of classic New York from Woody Allen movies."
        }
      ]
    },
    culture: {
      title: 'Cultural Code',
      description: 'Art doesn\'t hide in museums here — it\'s spilled into the air, from Broadway stages to street graffiti.',
      broadway: {
        title: 'Broadway',
        desc: 'The theatrical heart of the world. 41 stages where magic happens every night.'
      },
      fashion: {
        title: 'Fashion',
        desc: 'Fifth Avenue runways and SoHo boutiques. The global style capital.'
      },
      jazz: {
        title: 'Jazz',
        desc: 'Saxophone at Blue Note and improv at Village Vanguard.'
      },
      museums: {
        title: 'Museums',
        desc: 'Met, MoMA, Guggenheim. Treasuries of civilization.'
      },
      nightlife: {
        title: 'Night Rhythm',
        desc: 'From secret speakeasies to techno raves in Brooklyn.'
      }
    },
    culinary: {
      title: 'City Tastes',
      quote: '"New York is the only city in the world where you can get the best meal of your life at 3 AM."',
      cta: 'Michelin Guides →',
      items: [
        {
          name: "NY Pizza",
          desc: "Thin, crispy, huge. Fold the slice in half and enjoy."
        },
        {
          name: "Bagel",
          desc: "Breakfast cult. Dense, boiled before baking, with cream cheese and lox."
        },
        {
          name: "Cheesecake",
          desc: "Classic 'New York': dense, creamy, with hints of vanilla."
        },
        {
          name: "Hot Dog",
          desc: "Street classic from a cart. Mustard, sauerkraut, and onion sauce."
        }
      ]
    },
    history: {
      title: 'Time Map',
      tracks: [
        { id: 1, name: 'Society', color: '#ee352e' }, // Red (1/2/3)
        { id: 2, name: 'Infrastructure', color: '#0039a6' }, // Blue (A/C/E)
        { id: 3, name: 'Culture', color: '#fccc0a' } // Yellow (N/Q/R)
      ],
      events: [
        { year: '1624', track: 1, title: 'New Amsterdam', desc: 'Dutch settlers establish a trading outpost on Manhattan tip.' },
        { year: '1664', track: 1, title: 'British Rule', desc: 'The city is captured by the English and renamed New York.' },
        { year: '1776', track: 1, title: 'Battle of Brooklyn', desc: 'The largest battle of the American Revolutionary War.' },
        { year: '1811', track: 2, title: 'The Grid Plan', desc: 'The Commissioners\' Plan establishes the street grid.' },
        { year: '1883', track: 2, title: 'Brooklyn Bridge', desc: 'The Eighth Wonder of the World connects two great cities.' },
        { year: '1886', track: 1, title: 'Statue of Liberty', desc: 'Dedication of France\'s gift, a beacon for immigrants.' },
        { year: '1904', track: 2, title: 'First Subway', desc: 'The IRT line opens from City Hall to 145th Street.' },
        { year: '1920', track: 3, title: 'Jazz Age', desc: 'Harlem Renaissance flourishes with art and speakeasies.' },
        { year: '1931', track: 2, title: 'Empire State', desc: 'Skyscraper race peaks. 102 floors built in 410 days.' },
        { year: '1969', track: 1, title: 'Stonewall', desc: 'Riots in Greenwich Village spark LGBT rights movement.' },
        { year: '1973', track: 3, title: 'Birth of Hip-Hop', desc: 'DJ Kool Herc\'s party in the Bronx changes music forever.' },
        { year: '1977', track: 1, title: 'The Blackout', desc: '25 hours of darkness, chaos, and a legendary cultural shift.' },
        { year: '2001', track: 1, title: '9/11', desc: 'The day that changed the world. City shows immense resilience.' },
        { year: '2009', track: 3, title: 'High Line', desc: 'Park on abandoned rail line opens, redefining urbanism.' },
        { year: '2014', track: 2, title: 'One WTC', desc: 'Freedom Tower restores the Manhattan skyline.' },
      ]
    },
    transport: {
      title: 'In Motion',
      description: 'The system that never sleeps. Choose your rhythm.',
      items: [
        {
          id: 'subway',
          title: 'MTA Subway',
          desc: 'The city\'s circulatory system.',
          price: '$2.90',
          status: '24/7',
          tip: 'Use OMNY at turnstiles. Avoid empty cars.',
          image: '/items/MTA_Subway.JPG'
        },
        {
          id: 'taxi',
          title: 'Yellow Cab',
          desc: 'Icon of Manhattan streets.',
          price: '$3.00+',
          status: 'On Demand',
          tip: 'Green cabs only operate in Upper Manhattan & Boroughs.',
          image: '/items/Yellow_Cab.JPG'
        },
        {
          id: 'walk',
          title: 'Walking',
          desc: 'The best way to see details.',
          price: 'Free',
          status: 'Always',
          tip: 'Avenues are long, streets are short. 20 blocks ~ 1 mile.',
          image: '/items/Walking.JPG'
        }
      ]
    },
    footer: {
      about: 'About',
      contacts: 'Contact',
      privacy: 'Privacy',
      madeWith: 'Made with',
      for: 'for NYC lovers',
      subscribeTitle: 'Join the Pulse',
      subscribeDesc: 'Weekly curated guides and hidden gems.',
      emailPlaceholder: 'Your email address',
      subscribeBtn: 'Subscribe',
      links: {
        explore: 'Explore',
        connect: 'Connect',
        legal: 'Legal'
      },
      time: 'NYC Time',
      backToTop: 'Back to Top',
      terms: 'Terms of Use',
      sitemap: 'Sitemap',
      weather: 'Weather',
      weatherCondition: 'Clear',
      crowd: 'Times Sq Crowd',
    }
  }
};
