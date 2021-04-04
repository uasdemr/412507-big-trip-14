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
  'Drive','Flight','Check-in',
  'Sightseeng',
  'Restaurant',
];

const typeGenerator = () => {
  return types[getRandomInteger(0, types.length - 1)];
};

const citys = ['Amsterdam', 'Chamonix', 'Geneva', 'Краснодар', 'Ростов-на-дону'];


const generateDestination = () => {
  const generateFotos = (num) => {

    const generateFoto = () => {
      const num = getRandomInteger(1, 10000);
      const mainStr = `http://picsum.photos/248/152?r=${num}`;
      return mainStr;
    };

    const objectCreator = () => {
      const returnedArr = [];
      for(let i = 0; i < num; i++) {
        returnedArr.push(generateFoto());
      }

      // надо вернуть массив наполненный объектами типа
      const returnedObj = {
        'src': returnedArr.join(','),
        'description': generateDescription(),
      };

      return returnedObj;
    };

    const objects = [];
    for(let i = 0; i < getRandomInteger(0, 7); i++) {
      objects.push(objectCreator());
    }
    return objects;
  };

  const generateDescription = () => {
    const destination = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
    const destinationArr = destination.split('. ');
    let newDestination = '';
    for(let i = 0; i < getRandomInteger(0, destinationArr.length); i++) {
      newDestination+= destinationArr[i] + '.';
    }
    return newDestination;
  };

  return {
    'description': generateDescription(),
    'name': citys[getRandomInteger(0, citys.length -1 )],
    'pictures': generateFotos(getRandomInteger(0, 7)),
  };
};


const generateOffers = () => {
  const offers = [
    {
      'title': 'Add luggage',
      'price': 30,
    }, {
      'title': 'Switch to comfort class',
      'price': 100,
    },
    {
      'title': 'Add meal',
      'price': 15,
    }, {
      'title': 'Choose seats',
      'price': 5,
    },
    {
      'title': 'Travel by train',
      'price': 40,
    },
  ];
  const newOffers = [];
  for(let i = 0; i < getRandomInteger(0, offers.length); i++) {
    newOffers.push(offers[i]);
  }

  return newOffers;
};


const generatePoint = (num) => {
  return {
    'base_price': getRandomInteger(5, 2000),
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': generateDestination(),
    'id': num,
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    'offers': generateOffers(),
    'type': typeGenerator(),
  };
};

const generatePoints = (num) => {
  const returnedArr = [];
  for(let i = 0; i < num; i++) {
    returnedArr[i] = generatePoint(i);
  }
  return returnedArr;
};

export {generatePoints};
