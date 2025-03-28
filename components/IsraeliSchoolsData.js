// List of Israeli cities
const israeliCities = [
  "Jerusalem",
  "Tel Aviv-Yafo",
  "Haifa",
  "Rishon LeZion",
  "Petah Tikva",
  "Ashdod",
  "Netanya",
  "Beer Sheva",
  "Holon",
  "Bnei Brak",
  "Ramat Gan",
  "Bat Yam",
  "Ashkelon",
  "Rehovot",
  "Herzliya",
  "Kfar Saba",
  "Hadera",
  "Modi'in-Maccabim-Re'ut",
  "Nazareth",
  "Lod",
  "Ramla",
  "Ra'anana",
  "Nahariya",
  "Givatayim",
  "Kiryat Ata",
  "Kiryat Gat",
  "Acre",
  "Eilat",
  "Afula",
  "Tiberias",
  "Kiryat Yam",
  "Kiryat Motzkin",
  "Kiryat Bialik",
  "Kiryat Ono",
  "Or Yehuda",
  "Safed",
  "Yavne",
  "Dimona",
  "Tamra",
  "Netivot",
  "Sakhnin",
  "Yehud-Monosson",
  "Tirat Carmel",
  "Arad",
  "Karmiel",
  "Umm al-Fahm",
  "Sderot",
  "Rosh HaAyin",
  "Migdal HaEmek",
  "Hod HaSharon",
  "Qalansawe",
  "Tayibe",
  "Kafr Qasim",
  "Nesher",
  "Kiryat Shmona",
  "Ofakim",
  "Shefa-'Amr",
  "Beit She'an",
  "Arraba",
  "Baqa al-Gharbiyye",
  "Mazkeret Batya",
  "Rahat",
  "Bet Shemesh",
  "Yokneam Illit",
  "Kafr Kanna",
  "Givat Shmuel",
  "Kiryat Malakhi",
  "Maalot-Tarshiha",
  "Maghar",
  "Tira",
  "Daliyat al-Karmel",
  "Yeruham",
  "Gedera",
  "Shlomi"
];

// Schools by city (sample data - in a real app, this would be a comprehensive database)
const schoolsByCity = {
  "Jerusalem": [
    "Hebrew University Secondary School",
    "Jerusalem American International School",
    "Gymnasia Rehavia",
    "Hartman High School",
    "Himmelfarb High School",
    "Boyer High School",
    "Evelina de Rothschild School",
    "Experimental School",
    "Keshet School",
    "Pelech Religious Experimental School for Girls"
  ],
  "Tel Aviv-Yafo": [
    "Shevah Mofet",
    "Ironi Alef High School",
    "Ironi Dalet High School",
    "Alliance High School",
    "Herzliya Hebrew Gymnasium",
    "Tichon Hadash",
    "Tichon Eroni Yud Alef",
    "Amal Tel Aviv",
    "Ankori High School",
    "Ort Singalovski"
  ],
  "Haifa": [
    "Hebrew Reali School",
    "Leo Baeck Education Center",
    "Ironi Alef High School",
    "Ironi Gimel High School",
    "Ironi Hey High School",
    "Hugim High School",
    "Bosmat",
    "Wizo Haifa Academy of Design and Education",
    "Alliance High School",
    "Carmel Zvulun High School"
  ],
  "Nazareth": [
    "St. Joseph School",
    "Nazareth Baptist School",
    "Nazareth Illit Comprehensive School",
    "Holy Family High School",
    "Masar School",
    "Terra Sancta College",
    "Salvatorian Sisters' School",
    "Nazareth Nuns School",
    "Orthodox High School",
    "Al-Salamah High School"
  ],
  // Add more cities with their schools
  "Beer Sheva": [
    "Makif Alef High School",
    "Makif Gimel High School",
    "Makif Dalet High School",
    "Makif Vav High School",
    "Makif Zayin High School",
    "Amit Ulpana",
    "Comprehensive Religious High School",
    "Amal Comprehensive High School",
    "Kaye Academic College of Education",
    "Technological High School"
  ],
  "Rishon LeZion": [
    "Gymnasia Realit",
    "Amit Hammer",
    "Makif Gimel",
    "Makif Dalet",
    "Makif Hey",
    "Makif Vav",
    "Makif Zayin",
    "Makif Het",
    "Makif Tet",
    "Makif Yud"
  ]
};

// For cities without specific school data, provide generic school names
const genericSchools = [
  "Regional High School",
  "Comprehensive School",
  "Municipal High School",
  "Religious High School",
  "Technological High School",
  "Arts High School",
  "Science High School",
  "Amal Network School",
  "ORT Network School",
  "Democratic School"
];

// Function to get schools for a city
function getSchoolsForCity(city) {
  if (schoolsByCity[city]) {
    return schoolsByCity[city];
  } else {
    // Return generic school names with city prefix
    return genericSchools.map(school => `${city} ${school}`);
  }
}

export { israeliCities, getSchoolsForCity };
