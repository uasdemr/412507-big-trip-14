const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const types = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const typeGenerator = () => {
  return types[getRandomInteger(0, types.length - 1)];
};

const citys = ['Amsterdam', 'Chamonix', 'Geneva', 'Краснодар', 'Ростов-на-дону'];


const generateDestination = () => {
  const generateFotos = () => {

    const generateFoto = () => {
      const num = getRandomInteger(1, 10000);
      return `http://picsum.photos/248/152?r=${num}`;
    };

    const objectCreator = () => {
      const returnedObj = {
        'src': generateFoto(),
        'description': generateDescription(),
      };

      return returnedObj;
    };

    const objects = [];
    for (let i = 0; i < getRandomInteger(0, 7); i++) {
      objects.push(objectCreator());
    }
    return objects;
  };

  const generateDescription = () => {
    const destination = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
    const destinationArr = destination.split('. ');
    let newDestination = '';
    for (let i = 0; i < getRandomInteger(0, destinationArr.length); i++) {
      newDestination += destinationArr[i] + '.';
    }
    return newDestination;
  };

  return {
    'description': generateDescription(),
    'name': citys[getRandomInteger(0, citys.length - 1)],
    'pictures': generateFotos(),
  };
};

const offersArr = [
  {
    'type': 'taxi',
    'offers': [
      {
        'title': 'Upgrade to a business class',
        'price': 190,
      },
      {
        'title': 'Choose the radio station',
        'price': 30,
      },
      {
        'title': 'Choose temperature',
        'price': 170,
      },
      {
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 100,
      },
      {
        'title': 'Drive slowly',
        'price': 110,
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Infotainment system',
        'price': 50,
      },
      {
        'title': 'Order meal',
        'price': 100,
      },
      {
        'title': 'Choose seats',
        'price': 190,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Book a taxi at the arrival point',
        'price': 110,
      },
      {
        'title': 'Order a breakfast',
        'price': 80,
      },
      {
        'title': 'Wake up at a certain time',
        'price': 140,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
      {
        'title': 'Choose meal',
        'price': 120,
      },
      {
        'title': 'Choose seats',
        'price': 90,
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 120,
      },
      {
        'title': 'Upgrade to business class',
        'price': 120,
      },
      {
        'title': 'Add luggage',
        'price': 170,
      },
      {
        'title': 'Business lounge',
        'price': 160,
      },
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Choose the time of check-in',
        'price': 70,
      },
      {
        'title': 'Choose the time of check-out',
        'price': 190,
      },
      {
        'title': 'Add breakfast',
        'price': 110,
      },
      {
        'title': 'Laundry',
        'price': 140,
      },
      {
        'title': 'Order a meal from the restaurant',
        'price': 30,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Choose meal',
        'price': 130,
      },
      {
        'title': 'Choose seats',
        'price': 160,
      },
      {
        'title': 'Upgrade to comfort class',
        'price': 170,
      },
      {
        'title': 'Upgrade to business class',
        'price': 150,
      },
      {
        'title': 'Add luggage',
        'price': 100,
      },
      {
        'title': 'Business lounge',
        'price': 40,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Choose comfort class',
        'price': 110,
      },
      {
        'title': 'Choose business class',
        'price': 180,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'title': 'Choose live music',
        'price': 150,
      },
      {
        'title': 'Choose VIP area',
        'price': 70,
      },
    ],
  },
];

const generateOffers = (type) => {
  for (const offer of offersArr) {
    if(offer.type == type.toLowerCase()) {
      return offer.offers;
    }
  }
};


const generatePoint = (num) => {
  const typeGenerated = typeGenerator();
  return {
    'base_price': getRandomInteger(5, 2000),
    'date_from': '2019-07-10T08:53:00.845Z',
    'date_to': '2019-07-13T10:03:00.375Z',
    'destination': generateDestination(),
    'id': num,
    'is_favorite': Math.random() > 0.5,
    'offers': generateOffers(typeGenerated),
    'type': typeGenerated,
  };
};

const generatePoints = (num) => {
  const returnedArr = [];
  for (let i = 0; i < num; i++) {
    returnedArr[i] = generatePoint(i);
  }
  return returnedArr;
};

export { generatePoints };
