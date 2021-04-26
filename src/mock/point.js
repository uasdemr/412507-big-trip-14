import { EVENT_TYPES, DESTINATION } from '../view/const.js';
import { getRandomInteger } from '../utils/common';

const typeGenerator = () => {
  const types = Object.keys(EVENT_TYPES);
  return types[getRandomInteger(0, types.length - 1)];
};

const generateDestination2 = () => {
  return destinations[getRandomInteger(0, destinations.length - 1)];
};

const offers = [
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

const destinations = [
  {
    'name': 'Chamonix',
    'description': 'Chamonix, a true asian pearl, with crowded streets, with a beautiful old town, for those who value comfort and coziness, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.22279078864792434',
        'description': 'Chamonix kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8943086254354238',
        'description': 'Chamonix parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7525632069166379',
        'description': 'Chamonix park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5316752459820515',
        'description': 'Chamonix street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.44656824241870985',
        'description': 'Chamonix street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6982855798719914',
        'description': 'Chamonix park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.43975071763397144',
        'description': 'Chamonix street market',
      },
    ],
  },
  {
    'name': 'Geneva',
    'description': 'Geneva, with crowded streets, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.49539856256891834',
        'description': 'Geneva central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5986817848804671',
        'description': 'Geneva zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9070830121251612',
        'description': 'Geneva biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.48748561050667605',
        'description': 'Geneva park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8839534685786179',
        'description': 'Geneva city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5225178733348936',
        'description': 'Geneva zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.05364117907754795',
        'description': 'Geneva kindergarten',
      },
    ],
  },
  {
    'name': 'Amsterdam',
    'description': 'Amsterdam, with crowded streets, in a middle of Europe, for those who value comfort and coziness.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.8811884365550775',
        'description': 'Amsterdam park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.25239495164621517',
        'description': 'Amsterdam embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9163268083535163',
        'description': 'Amsterdam kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.15374512014315656',
        'description': 'Amsterdam park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.23408986495659723',
        'description': 'Amsterdam parliament building',
      },
    ],
  },
  {
    'name': 'Helsinki',
    'description': 'Helsinki, middle-eastern paradise.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.5093407618421364',
        'description': 'Helsinki zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.20441723649529364',
        'description': 'Helsinki parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.15791905226024094',
        'description': 'Helsinki park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.592031200236768',
        'description': 'Helsinki parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5676052248541277',
        'description': 'Helsinki kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.861939515060856',
        'description': 'Helsinki central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6386859757944972',
        'description': 'Helsinki city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2811000493855911',
        'description': 'Helsinki central station',
      },
    ],
  },
  {
    'name': 'Oslo',
    'description': 'Oslo, a true asian pearl, with crowded streets, in a middle of Europe, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.7853024763261367',
        'description': 'Oslo city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.38615645327918013',
        'description': 'Oslo central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5969317632635374',
        'description': 'Oslo city centre',
      },
    ],
  },
  {
    'name': 'Kopenhagen',
    'description': 'Kopenhagen, a true asian pearl, with crowded streets, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.2186695266186709',
        'description': 'Kopenhagen embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6545801020564896',
        'description': 'Kopenhagen park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1675585811659588',
        'description': 'Kopenhagen parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5226794159145915',
        'description': 'Kopenhagen parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.40991099874164605',
        'description': 'Kopenhagen zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6091111723463194',
        'description': 'Kopenhagen city centre',
      },
    ],
  },
  {
    'name': 'Den Haag',
    'description': 'Den Haag, is a beautiful city, a true asian pearl, with a beautiful old town.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.7260643550043095',
        'description': 'Den Haag kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.20839152403581696',
        'description': 'Den Haag central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3702414109543084',
        'description': 'Den Haag zoo',
      },
    ],
  },
  {
    'name': 'Rotterdam',
    'description': 'Rotterdam, is a beautiful city, a true asian pearl, in a middle of Europe, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.45315017112749767',
        'description': 'Rotterdam kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2629082253074815',
        'description': 'Rotterdam city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.983108378410656',
        'description': 'Rotterdam parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8087647596860472',
        'description': 'Rotterdam embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.09074411617979838',
        'description': 'Rotterdam kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2050090775119633',
        'description': 'Rotterdam city centre',
      },
    ],
  },
  {
    'name': 'Saint Petersburg',
    'description': 'Saint Petersburg, a true asian pearl.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.24725972827107712',
        'description': 'Saint Petersburg central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9440084510036029',
        'description': 'Saint Petersburg city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.25413437743470446',
        'description': 'Saint Petersburg central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6802933359016741',
        'description': 'Saint Petersburg city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7636365769828031',
        'description': 'Saint Petersburg embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.60212411684412',
        'description': 'Saint Petersburg city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.02562050559948381',
        'description': 'Saint Petersburg parliament building',
      },
    ],
  },
  {
    'name': 'Moscow',
    'description': 'Moscow, with crowded streets, with a beautiful old town.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.433517199152071',
        'description': 'Moscow parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.23499932439445037',
        'description': 'Moscow city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7071399634967444',
        'description': 'Moscow street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2022312882460846',
        'description': 'Moscow biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6886497658621269',
        'description': 'Moscow street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.09301859493876186',
        'description': 'Moscow central station',
      },
    ],
  },
  {
    'name': 'Sochi',
    'description': 'Sochi, is a beautiful city, with crowded streets, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.4125746722357164',
        'description': 'Sochi embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.505917532492562',
        'description': 'Sochi street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.4982015882830504',
        'description': 'Sochi park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.25765713921146993',
        'description': 'Sochi biggest supermarket',
      },
    ],
  },
  {
    'name': 'Tokio',
    'description': 'Tokio, a true asian pearl, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.5931369438555605',
        'description': 'Tokio park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8140027577180715',
        'description': 'Tokio biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9462682161344906',
        'description': 'Tokio embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2878677171880013',
        'description': 'Tokio parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.31707551467620054',
        'description': 'Tokio central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8694260940066412',
        'description': 'Tokio parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.36333142977778965',
        'description': 'Tokio street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.18254701447203825',
        'description': 'Tokio central station',
      },
    ],
  },
  {
    'name': 'Kioto',
    'description': 'Kioto, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.01761808617241023',
        'description': 'Kioto city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9159605641312847',
        'description': 'Kioto embankment',
      },
    ],
  },
  {
    'name': 'Nagasaki',
    'description': 'Nagasaki, is a beautiful city, with crowded streets, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.4858753982910027',
        'description': 'Nagasaki street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8878299347165817',
        'description': 'Nagasaki street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.32605576536494363',
        'description': 'Nagasaki park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.744203353324298',
        'description': 'Nagasaki park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.47558572960489265',
        'description': 'Nagasaki street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.847068431536496',
        'description': 'Nagasaki zoo',
      },
    ],
  },
  {
    'name': 'Hiroshima',
    'description': 'Hiroshima, is a beautiful city, with a beautiful old town.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.559506309574338',
        'description': 'Hiroshima embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.19725742251759604',
        'description': 'Hiroshima central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.005898607428726388',
        'description': 'Hiroshima zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.41171403348183055',
        'description': 'Hiroshima parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.008537911342173299',
        'description': 'Hiroshima parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6076992860041928',
        'description': 'Hiroshima zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.21603466188462384',
        'description': 'Hiroshima parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6129584702355171',
        'description': 'Hiroshima parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.12736289522997835',
        'description': 'Hiroshima central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7319164276924386',
        'description': 'Hiroshima park',
      },
    ],
  },
  {
    'name': 'Berlin',
    'description': 'Berlin, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.9759754317375942',
        'description': 'Berlin biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7902465136531711',
        'description': 'Berlin zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.026046766768407892',
        'description': 'Berlin parliament building',
      },
    ],
  },
  {
    'name': 'Munich',
    'description': 'Munich, in a middle of Europe, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.6712886886287701',
        'description': 'Munich street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3902514042147378',
        'description': 'Munich central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.05679209715426259',
        'description': 'Munich central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5578304351405736',
        'description': 'Munich park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8138070271018856',
        'description': 'Munich biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8335129848545839',
        'description': 'Munich parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.164431888124013',
        'description': 'Munich embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5379020634501124',
        'description': 'Munich zoo',
      },
    ],
  },
  {
    'name': 'Frankfurt',
    'description': 'Frankfurt, is a beautiful city, with crowded streets, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.617747833754063',
        'description': 'Frankfurt parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.15793673514138296',
        'description': 'Frankfurt kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5409235764364453',
        'description': 'Frankfurt kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8144781306626327',
        'description': 'Frankfurt central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3256401752289626',
        'description': 'Frankfurt parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5148542301190786',
        'description': 'Frankfurt city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5074201851495808',
        'description': 'Frankfurt zoo',
      },
    ],
  },
  {
    'name': 'Vien',
    'description': 'Vien, is a beautiful city, with a beautiful old town.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.5953955437225635',
        'description': 'Vien kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8209552480963958',
        'description': 'Vien embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6400149185660422',
        'description': 'Vien zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.16356800407844752',
        'description': 'Vien biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8523621520164477',
        'description': 'Vien city centre',
      },
    ],
  },
  {
    'name': 'Rome',
    'description': 'Rome, with crowded streets, in a middle of Europe, with a beautiful old town.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.07086682326678595',
        'description': 'Rome central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7452540383238302',
        'description': 'Rome parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.021837515171872823',
        'description': 'Rome central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.10259911725158077',
        'description': 'Rome parliament building',
      },
    ],
  },
  {
    'name': 'Naples',
    'description': 'Naples, in a middle of Europe, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.8891732488801956',
        'description': 'Naples kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.49922969902760084',
        'description': 'Naples parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1806175438433295',
        'description': 'Naples park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.4673734472696778',
        'description': 'Naples city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.23786858381869602',
        'description': 'Naples biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1128849302875814',
        'description': 'Naples zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.599286558870799',
        'description': 'Naples city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8054693675265547',
        'description': 'Naples embankment',
      },
    ],
  },
  {
    'name': 'Venice',
    'description': 'Venice, in a middle of Europe, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.015466165393477782',
        'description': 'Venice embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0825506066487951',
        'description': 'Venice biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.02276768163577314',
        'description': 'Venice parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9552712949760673',
        'description': 'Venice parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7507666453092525',
        'description': 'Venice park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.4304343879920751',
        'description': 'Venice parliament building',
      },
    ],
  },
  {
    'name': 'Milan',
    'description': 'Milan, a true asian pearl, in a middle of Europe, for those who value comfort and coziness.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.17651361627232598',
        'description': 'Milan park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.08763411177514047',
        'description': 'Milan central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2875202307460041',
        'description': 'Milan kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1484816483129845',
        'description': 'Milan biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5771735684327575',
        'description': 'Milan parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6285081300881197',
        'description': 'Milan zoo',
      },
    ],
  },
  {
    'name': 'Monaco',
    'description': 'Monaco, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.18295169724873772',
        'description': 'Monaco central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.5911556426310205',
        'description': 'Monaco embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1949133137850223',
        'description': 'Monaco parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3543010158980493',
        'description': 'Monaco kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.11474626881331473',
        'description': 'Monaco street market',
      },
    ],
  },
  {
    'name': 'Paris',
    'description': 'Paris, a true asian pearl, with a beautiful old town, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.8083327097644619',
        'description': 'Paris street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6430000337197457',
        'description': 'Paris city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.457890507862708',
        'description': 'Paris biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7350591709106062',
        'description': 'Paris park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.7506064196669824',
        'description': 'Paris park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.2602661282040275',
        'description': 'Paris city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.0554746645052302',
        'description': 'Paris park',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8241701888203501',
        'description': 'Paris zoo',
      },
    ],
  },
  {
    'name': 'Barcelona',
    'description': 'Barcelona, is a beautiful city, a true asian pearl, with crowded streets, middle-eastern paradise, for those who value comfort and coziness.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.9718004852027666',
        'description': 'Barcelona city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.18230496758888304',
        'description': 'Barcelona biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.17412097624735523',
        'description': 'Barcelona zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.13617866971972847',
        'description': 'Barcelona embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.34569511127611197',
        'description': 'Barcelona kindergarten',
      },
    ],
  },
  {
    'name': 'Valencia',
    'description': 'Valencia, is a beautiful city, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.6247352805270456',
        'description': 'Valencia kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.289550105458938',
        'description': 'Valencia city centre',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.3298811256334857',
        'description': 'Valencia zoo',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1373948863120451',
        'description': 'Valencia biggest supermarket',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6829494348323948',
        'description': 'Valencia embankment',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.1881528575985303',
        'description': 'Valencia central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.6979029221712691',
        'description': 'Valencia zoo',
      },
    ],
  },
  {
    'name': 'Madrid',
    'description': 'Madrid, is a beautiful city, with a beautiful old town, for those who value comfort and coziness, a perfect place to stay with a family.',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.5384652742643421',
        'description': 'Madrid street market',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.857637815450206',
        'description': 'Madrid central station',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.15374917669477406',
        'description': 'Madrid parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8088867847277204',
        'description': 'Madrid parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.9496564062746646',
        'description': 'Madrid kindergarten',
      },
    ],
  },
];

const getUniqueRandomItemsFromArray = (items) => {
  const randomItems = [];
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const num = getRandomInteger(0, items.length - 1);
      if (!randomItems.find((it) => it === items[num])) {
        randomItems.push(items[num]);
      }
    }
  }
  return randomItems;
};

const generateOffers = (type) => {
  // return offers.find((offer) => offer.type === type).offers;
  return getUniqueRandomItemsFromArray(offers.find((offer) => offer.type === type).offers);
};

let beginJourney = new Date('2020-01-10T08:53:00.845Z').getTime();
const dateGenerator = () => {
  const start = beginJourney + 22345678;
  const end = start + getRandomInteger(1234567, 12345678);
  beginJourney = beginJourney + 22345678;
  return {
    start,
    end,
  };
};

const generatePoint = (num) => {
  const typeGenerated = typeGenerator();
  const date = dateGenerator();

  return {
    'basePrice': getRandomInteger(5, 2000),
    'dateFrom': date.start,
    'dateTo': date.end,
    'destination': generateDestination2(),
    'id': num,
    'isFavorite': Math.random() > 0.5,
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

export { generatePoints, offers, destinations };
