/**
 * Campaign data from markdown reports (single source of truth).
 */

export const terrestrial = {
  decJan: { householdsReachedM: 29.6, spots: 514, avgFrequency: 9.2, totalTVR: 2175.4 },
  feb: { householdsReachedM: 41, spots: 1020, avgFrequency: 13.1, totalTVR: 3487.3 },
  mar: { householdsReachedM: 45, spots: 1110, avgFrequency: 20.1, totalTVR: 4133.7 },
};

export const cable = {
  decJan: { householdsReachedM: 20.1, spots: 750, avgFrequency: 7.0, grps: 2595 },
  feb: { householdsReachedM: 21.2, spots: 871, avgFrequency: 9.9, grps: 2739 },
  mar: { householdsReachedM: 22.1, spots: 777, avgFrequency: 10.7, grps: 2668 },
};

export const dstv = {
  decJan: { totalTVR: 1830.2, impacts: 8361264, insertions: 403, avgFrequency: 7.5, householdsReachedM: 8.4 },
  feb: { totalTVR: 1779.7, impacts: 10744050, insertions: 574, avgFrequency: 11.4, householdsReachedM: 10.7 },
  mar: { totalTVR: 2051.7, impacts: 11168044, insertions: 489, avgFrequency: 13.8, householdsReachedM: 11.2 },
};

export const gotv = {
  decJan: { totalTVR: 1665.8, impacts: 10347466, insertions: 370, avgFrequency: 6.5, householdsReachedM: 10.4 },
  feb: { totalTVR: 1080.3, impacts: 10527443, insertions: 297, avgFrequency: 8.4, householdsReachedM: 10.5 },
  mar: { totalTVR: 1344.7, impacts: 10889916, insertions: 288, avgFrequency: 6.1, householdsReachedM: 10.9 },
};

export const terrestrialChannelsDecJan = [
  { channel: "Arise News", tvr: 325.1, impacts: 4859162 },
  { channel: "Channels TV", tvr: 329.0, impacts: 3710056 },
  { channel: "AIT Network", tvr: 234.5, impacts: 1416686 },
  { channel: "Zee World", tvr: 207.1, impacts: 2989274 },
  { channel: "NTA Network", tvr: 215.3, impacts: 11880793 },
  { channel: "CNN", tvr: 184.2, impacts: 1311716 },
  { channel: "TVC", tvr: 177.0, impacts: 1162570 },
  { channel: "ROK2", tvr: 128.2, impacts: 844008 },
  { channel: "ROK", tvr: 104.4, impacts: 456526 },
  { channel: "Arewa TV", tvr: 116.3, impacts: 996425 },
  { channel: "SuperSport Motorsport", tvr: 91.7, impacts: 211257 },
  { channel: "SuperSport Golf", tvr: 51.3, impacts: 74848 },
  { channel: "SuperSport Tennis", tvr: 11.3, impacts: 52377 },
];

export const terrestrialChannelsFeb = [
  { channel: "NTA Network", tvr: 692.9, impacts: 14350377 },
  { channel: "Channels TV", tvr: 394.8, impacts: 4357546 },
  { channel: "CNN", tvr: 375.6, impacts: 1777689 },
  { channel: "Arise News", tvr: 469.7, impacts: 7603511 },
  { channel: "AIT Network", tvr: 284.4, impacts: 1800576 },
  { channel: "TVC", tvr: 212.4, impacts: 1789974 },
  { channel: "Zee World", tvr: 207.1, impacts: 4789274 },
  { channel: "ROK2", tvr: 164.8, impacts: 1193013 },
  { channel: "SuperSport Blitz", tvr: 136.4, impacts: 586912 },
  { channel: "ROK", tvr: 136.4, impacts: 871216 },
  { channel: "Arewa TV", tvr: 142.6, impacts: 1412914 },
  { channel: "SuperSport Motorsport", tvr: 101.6, impacts: 256504 },
  { channel: "SuperSport Golf", tvr: 90.3, impacts: 103728 },
  { channel: "SuperSport Tennis", tvr: 78.3, impacts: 99012 },
];

export const terrestrialChannelsMar = [
  { channel: "NTA Network", tvr: 827.2, impacts: 15727772 },
  { channel: "Arise News", tvr: 553.2, impacts: 8362104 },
  { channel: "Channels TV", tvr: 470.5, impacts: 4790119 },
  { channel: "CNN", tvr: 443.7, impacts: 1964221 },
  { channel: "AIT Network", tvr: 336.6, impacts: 1996556 },
  { channel: "TVC", tvr: 251.4, impacts: 1978963 },
  { channel: "Zee World", tvr: 244.9, impacts: 5214662 },
  { channel: "ROK2", tvr: 194.5, impacts: 1318904 },
  { channel: "Arewa TV", tvr: 168.4, impacts: 1559821 },
  { channel: "ROK", tvr: 161.3, impacts: 955447 },
  { channel: "SuperSport Blitz", tvr: 160.8, impacts: 652998 },
  { channel: "SuperSport Motorsport", tvr: 120.4, impacts: 285771 },
  { channel: "SuperSport Golf", tvr: 106.6, impacts: 115936 },
  { channel: "SuperSport Tennis", tvr: 93.5, impacts: 110224 },
];

export const cableChannelsDecJan = [
  { platform: "DStv", channel: "Africa Magic Epic", tvr: 476.9, impacts: 2649520 },
  { platform: "GOtv", channel: "Africa Magic Epic", tvr: 426.0, impacts: 3497796 },
  { platform: "DStv", channel: "Africa Magic Yoruba", tvr: 316.0, impacts: 1340440 },
  { platform: "GOtv", channel: "Africa Magic Yoruba", tvr: 207.5, impacts: 3212111 },
  { platform: "DStv", channel: "Africa Magic Family", tvr: 270.8, impacts: 896883 },
  { platform: "GOtv", channel: "ROK2", tvr: 238.2, impacts: 556908 },
  { platform: "DStv", channel: "Africa Magic Hausa", tvr: 137.7, impacts: 341787 },
  { platform: "GOtv", channel: "Africa Magic Hausa", tvr: 186.0, impacts: 496932 },
  { platform: "DStv", channel: "Telemundo", tvr: 141.1, impacts: 837262 },
  { platform: "DStv", channel: "SuperSport EPL Nig.", tvr: 125.7, impacts: 456296 },
  { platform: "GOtv", channel: "Go Football", tvr: 120.2, impacts: 526958 },
  { platform: "GOtv", channel: "ROK", tvr: 121.6, impacts: 373569 },
  { platform: "DStv", channel: "Trace Naija", tvr: 119.1, impacts: 371385 },
  { platform: "DStv", channel: "Africa Magic Showcase", tvr: 152.8, impacts: 1304747 },
  { platform: "GOtv", channel: "Telemundo", tvr: 108.3, impacts: 471491 },
  { platform: "GOtv", channel: "Africa Magic Family", tvr: 258.0, impacts: 1211701 },
  { platform: "DStv", channel: "MTV Base", tvr: 90.1, impacts: 162914 },
];

export const cableChannelsFeb = [
  { platform: "DStv", channel: "Africa Magic Epic", tvr: 417.6, impacts: 2676110 },
  { platform: "GOtv", channel: "Africa Magic Epic", tvr: 357.5, impacts: 3675352 },
  { platform: "DStv", channel: "Africa Magic Yoruba", tvr: 320.7, impacts: 2912433 },
  { platform: "GOtv", channel: "Africa Magic Yoruba", tvr: 160.6, impacts: 3570912 },
  { platform: "DStv", channel: "Africa Magic Family", tvr: 296.4, impacts: 1080919 },
  { platform: "GOtv", channel: "SuperSport Football", tvr: 294.7, impacts: 773100 },
  { platform: "DStv", channel: "Trace Naija", tvr: 183.6, impacts: 601159 },
  { platform: "DStv", channel: "Telemundo", tvr: 175.4, impacts: 943407 },
  { platform: "DStv", channel: "Africa Magic Showcase", tvr: 160.1, impacts: 1661240 },
  { platform: "GOtv", channel: "Africa Magic Family", tvr: 64.7, impacts: 1367127 },
  { platform: "DStv", channel: "Africa Magic Hausa", tvr: 119.5, impacts: 287366 },
  { platform: "GOtv", channel: "Africa Magic Hausa", tvr: 102.7, impacts: 531749 },
  { platform: "DStv", channel: "SuperSport EPL", tvr: 106.4, impacts: 581416 },
  { platform: "GOtv", channel: "Telemundo", tvr: 100.1, impacts: 609203 },
];

export const cableChannelsMar = [
  { platform: "DStv", channel: "Africa Magic Epic", tvr: 563.5, impacts: 3133633 },
  { platform: "GOtv", channel: "Africa Magic Epic", tvr: 533.9, impacts: 4279818 },
  { platform: "DStv", channel: "Africa Magic Yoruba", tvr: 349.2, impacts: 2229547 },
  { platform: "DStv", channel: "Africa Magic Family", tvr: 315.3, impacts: 1295537 },
  { platform: "GOtv", channel: "SuperSport Football", tvr: 317.8, impacts: 706738 },
  { platform: "DStv", channel: "Telemundo", tvr: 197.4, impacts: 985100 },
  { platform: "DStv", channel: "Trace Naija", tvr: 188.4, impacts: 671317 },
  { platform: "GOtv", channel: "Africa Magic Yoruba", tvr: 180.8, impacts: 3055301 },
  { platform: "DStv", channel: "Africa Magic Showcase", tvr: 160.3, impacts: 1931417 },
  { platform: "DStv", channel: "Africa Magic Hausa", tvr: 143.9, impacts: 310832 },
  { platform: "DStv", channel: "SuperSport EPL", tvr: 133.7, impacts: 610661 },
  { platform: "GOtv", channel: "Telemundo", tvr: 107.5, impacts: 659148 },
  { platform: "GOtv", channel: "Africa Magic Hausa", tvr: 103.2, impacts: 545206 },
  { platform: "GOtv", channel: "Africa Magic Family", tvr: 101.5, impacts: 1643705 },
];

/** For period-over-period line/area charts */
export const periodTimeline = [
  { period: "Dec/Jan", cableHH: 20.1, terrestrialHH: 29.6, cableSpots: 750, terrestrialSpots: 514, cableFreq: 7.0, terrestrialFreq: 9.2 },
  { period: "Feb", cableHH: 21.2, terrestrialHH: 41, cableSpots: 871, terrestrialSpots: 1020, cableFreq: 9.9, terrestrialFreq: 13.1 },
  { period: "Mar", cableHH: 22.1, terrestrialHH: 45, cableSpots: 777, terrestrialSpots: 1110, cableFreq: 10.7, terrestrialFreq: 20.1 },
];

/** Terrestrial campaign performance by program (Funita Campaign Performance Report) */
export const terrestrialProgramsFeb = [
  { channel: "Arise News", program: "THE MORNING SHOW (Ayo Mairo - Ese, Rueben & Rufai)", totalTVR: 469.7, impacts: 7603511, insertions: 20, avgFrequency: 6.8 },
  { channel: "Arewa TV", program: "ROS", totalTVR: 142.6, impacts: 1412914, insertions: 33, avgFrequency: 2.4 },
  { channel: "AIT Network", program: "KAKAKI", totalTVR: 121.3, impacts: 937548, insertions: 20, avgFrequency: 3.5 },
  { channel: "AIT Network", program: "NEWS @ 8PM", totalTVR: 163.1, impacts: 863028, insertions: 20, avgFrequency: 3.7 },
  { channel: "Channels TV", program: "POLITICS TODAY (Seun Okinbaloye)", totalTVR: 211.3, impacts: 979543, insertions: 20, avgFrequency: 6.1 },
  { channel: "Channels TV", program: "NEWS @ 10PM", totalTVR: 183.5, impacts: 3378003, insertions: 20, avgFrequency: 3.1 },
  { channel: "NTA Network", program: "NEWS @ 9PM", totalTVR: 339.7, impacts: 7039318, insertions: 20, avgFrequency: 6.7 },
  { channel: "NTA Network", program: "NEWSLINE", totalTVR: 353.2, impacts: 7311059, insertions: 20, avgFrequency: 8.2 },
  { channel: "TVC", program: "YOUR VIEW", totalTVR: 102.5, impacts: 966573, insertions: 30, avgFrequency: 4.1 },
  { channel: "TVC", program: "NEWS @ 10PM", totalTVR: 109.9, impacts: 823401, insertions: 30, avgFrequency: 3.9 },
  { channel: "Zee World", program: "8pm - 9pm Belt", totalTVR: 207.1, impacts: 4789274, insertions: 123, avgFrequency: 6.2 },
  { channel: "ROK", program: "TACTICAL SPONSORSHIP", totalTVR: 136.4, impacts: 871216, insertions: 156, avgFrequency: 5.9 },
  { channel: "ROK2", program: "TACTICAL SPONSORSHIP", totalTVR: 164.8, impacts: 1193013, insertions: 120, avgFrequency: 6.1 },
  { channel: "CNN", program: "TACTICAL ASSOCIATION", totalTVR: 375.6, impacts: 1777689, insertions: 186, avgFrequency: 6.3 },
  { channel: "SuperSport Blitz", program: "TACTICAL ASSOCIATION", totalTVR: 136.4, impacts: 586912, insertions: 55, avgFrequency: 4.2 },
  { channel: "SuperSport Tennis", program: "TACTICAL ASSOCIATION", totalTVR: 78.3, impacts: 99012, insertions: 50, avgFrequency: 5.9 },
  { channel: "SuperSport Motorsport", program: "TACTICAL ASSOCIATION", totalTVR: 101.6, impacts: 256504, insertions: 46, avgFrequency: 5.8 },
  { channel: "SuperSport Golf", program: "TACTICAL ASSOCIATION", totalTVR: 90.3, impacts: 103728, insertions: 51, avgFrequency: 5.6 },
];

export const terrestrialProgramsMar = [
  { channel: "Arise News", program: "THE MORNING SHOW (Ayo Mairo - Ese, Rueben & Rufai)", totalTVR: 553.2, impacts: 8362104, insertions: 24, avgFrequency: 7.5 },
  { channel: "Arewa TV", program: "ROS", totalTVR: 168.4, impacts: 1559821, insertions: 35, avgFrequency: 2.6 },
  { channel: "AIT Network", program: "KAKAKI", totalTVR: 142.9, impacts: 1038612, insertions: 22, avgFrequency: 3.8 },
  { channel: "AIT Network", program: "NEWS @ 8PM", totalTVR: 193.7, impacts: 957944, insertions: 22, avgFrequency: 4.1 },
  { channel: "Channels TV", program: "POLITICS TODAY (Seun Okinbaloye)", totalTVR: 251.6, impacts: 1084230, insertions: 22, avgFrequency: 6.7 },
  { channel: "Channels TV", program: "NEWS @ 10PM", totalTVR: 218.9, impacts: 3705889, insertions: 22, avgFrequency: 3.4 },
  { channel: "NTA Network", program: "NEWS @ 9PM", totalTVR: 405.8, impacts: 7715442, insertions: 22, avgFrequency: 7.4 },
  { channel: "NTA Network", program: "NEWSLINE", totalTVR: 421.4, impacts: 8012330, insertions: 22, avgFrequency: 9.0 },
  { channel: "TVC", program: "YOUR VIEW", totalTVR: 121.6, impacts: 1072845, insertions: 35, avgFrequency: 4.5 },
  { channel: "TVC", program: "NEWS @ 10PM", totalTVR: 129.8, impacts: 906118, insertions: 30, avgFrequency: 4.3 },
  { channel: "Zee World", program: "8pm - 9pm Belt", totalTVR: 244.9, impacts: 5214662, insertions: 124, avgFrequency: 6.8 },
  { channel: "ROK", program: "TACTICAL SPONSORSHIP", totalTVR: 161.3, impacts: 955447, insertions: 160, avgFrequency: 6.5 },
  { channel: "ROK2", program: "ROS", totalTVR: 194.5, impacts: 1318904, insertions: 130, avgFrequency: 6.7 },
  { channel: "CNN", program: "TACTICAL ASSOCIATION", totalTVR: 443.7, impacts: 1964221, insertions: 200, avgFrequency: 6.9 },
  { channel: "SuperSport Blitz", program: "TACTICAL ASSOCIATION", totalTVR: 160.8, impacts: 652998, insertions: 60, avgFrequency: 4.6 },
  { channel: "SuperSport Tennis", program: "TACTICAL ASSOCIATION", totalTVR: 93.5, impacts: 110224, insertions: 60, avgFrequency: 6.5 },
  { channel: "SuperSport Motorsport", program: "TACTICAL ASSOCIATION", totalTVR: 120.4, impacts: 285771, insertions: 60, avgFrequency: 6.4 },
  { channel: "SuperSport Golf", program: "TACTICAL ASSOCIATION", totalTVR: 106.6, impacts: 115936, insertions: 60, avgFrequency: 6.1 },
];

export const terrestrialProgramsDecJan = [
  { channel: "Arise News", program: "THE MORNING SHOW (Ayo Mairo - Ese, Rueben & Rufai)", totalTVR: 325.1, impacts: 4859162, insertions: 39, avgFrequency: 5.7 },
  { channel: "Arewa TV", program: "ROS", totalTVR: 116.3, impacts: 996425, insertions: 42, avgFrequency: 2.4 },
  { channel: "AIT Network", program: "KAKAKI", totalTVR: 98.6, impacts: 708343, insertions: 22, avgFrequency: 2.8 },
  { channel: "AIT Network", program: "NEWS @ 8PM", totalTVR: 135.9, impacts: 708343, insertions: 22, avgFrequency: 3.3 },
  { channel: "Channels TV", program: "POLITICS TODAY (Seun Okinbaloye)", totalTVR: 176.1, impacts: 805028, insertions: 20, avgFrequency: 5.9 },
  { channel: "Channels TV", program: "NEWS @ 10PM", totalTVR: 152.9, impacts: 2905028, insertions: 20, avgFrequency: 1.9 },
  { channel: "NTA Network", program: "NEWS @ 9PM", totalTVR: 116.4, impacts: 5575792, insertions: 20, avgFrequency: 6.3 },
  { channel: "NTA Network", program: "NEWSLINE", totalTVR: 98.9, impacts: 6305001, insertions: 20, avgFrequency: 7.9 },
  { channel: "TVC", program: "YOUR VIEW", totalTVR: 85.4, impacts: 657542, insertions: 30, avgFrequency: 3.3 },
  { channel: "TVC", program: "NEWS @ 10PM", totalTVR: 91.6, impacts: 505028, insertions: 20, avgFrequency: 3.7 },
  { channel: "Zee World", program: "8pm - 9pm Belt", totalTVR: 207.1, impacts: 2989274, insertions: 63, avgFrequency: 5.3 },
  { channel: "ROK", program: "TACTICAL SPONSORSHIP", totalTVR: 104.4, impacts: 456526, insertions: 45, avgFrequency: 5.4 },
  { channel: "ROK2", program: "ROS", totalTVR: 128.2, impacts: 844008, insertions: 44, avgFrequency: 3.9 },
  { channel: "CNN", program: "TACTICAL ASSOCIATION", totalTVR: 184.2, impacts: 1311716, insertions: 20, avgFrequency: 5.6 },
  { channel: "SuperSport Tennis", program: "ROS", totalTVR: 11.3, impacts: 52377, insertions: 29, avgFrequency: 5.4 },
  { channel: "SuperSport Motorsport", program: "ROS", totalTVR: 91.7, impacts: 211257, insertions: 28, avgFrequency: 5.7 },
  { channel: "SuperSport Golf", program: "ROS", totalTVR: 51.3, impacts: 74848, insertions: 30, avgFrequency: 5.5 },
];

/** CNN audience demographics (Funita: Your Target Customers spend time watching CNN) - kept for backward compat */
export const cnnGender = [
  { name: "Male", value: 56, fill: "#0d5c2e" },
  { name: "Female", value: 44, fill: "#5a9bd4" },
];

export const cnnAgeGroups = [
  { ageGroup: "Age 18-24", percentage: 4 },
  { ageGroup: "Age 25-34", percentage: 23 },
  { ageGroup: "Age 35-44", percentage: 33 },
  { ageGroup: "Age 45-54", percentage: 26 },
  { ageGroup: "Age 55-64", percentage: 12 },
  { ageGroup: "Age 65+", percentage: 2 },
];

/** CNN audience flow 06:00–24:00 (Mon-Fri values from report) */
export const cnnAudienceFlowByHour = [
  { timeSlot: "06:00", viewership: 40 },
  { timeSlot: "07:00", viewership: 35 },
  { timeSlot: "08:00", viewership: 40 },
  { timeSlot: "09:00", viewership: 45 },
  { timeSlot: "10:00", viewership: 50 },
  { timeSlot: "11:00", viewership: 55 },
  { timeSlot: "12:00", viewership: 58 },
  { timeSlot: "13:00", viewership: 55 },
  { timeSlot: "14:00", viewership: 52 },
  { timeSlot: "15:00", viewership: 55 },
  { timeSlot: "16:00", viewership: 52 },
  { timeSlot: "17:00", viewership: 55 },
  { timeSlot: "18:00", viewership: 60 },
  { timeSlot: "19:00", viewership: 65 },
  { timeSlot: "20:00", viewership: 58 },
  { timeSlot: "21:00", viewership: 65 },
  { timeSlot: "22:00", viewership: 75 },
  { timeSlot: "23:00", viewership: 72 },
];

/** All channels with audience demographics (Funita Feb report). Each has id, name, gender, ageGroups, audienceFlow (numeric by hour; null if text-only). */
export const audienceChannels = [
  {
    id: "cnn",
    name: "CNN",
    gender: [
      { name: "Male", value: 56, fill: "#0d5c2e" },
      { name: "Female", value: 44, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 4 },
      { ageGroup: "Age 25-34", percentage: 23 },
      { ageGroup: "Age 35-44", percentage: 33 },
      { ageGroup: "Age 45-54", percentage: 26 },
      { ageGroup: "Age 55-64", percentage: 12 },
      { ageGroup: "Age 65+", percentage: 2 },
    ],
    audienceFlow: [
      { timeSlot: "06:00", value: 40 },
      { timeSlot: "07:00", value: 35 },
      { timeSlot: "08:00", value: 40 },
      { timeSlot: "09:00", value: 45 },
      { timeSlot: "10:00", value: 50 },
      { timeSlot: "11:00", value: 55 },
      { timeSlot: "12:00", value: 58 },
      { timeSlot: "13:00", value: 55 },
      { timeSlot: "14:00", value: 52 },
      { timeSlot: "15:00", value: 55 },
      { timeSlot: "16:00", value: 52 },
      { timeSlot: "17:00", value: 55 },
      { timeSlot: "18:00", value: 60 },
      { timeSlot: "19:00", value: 65 },
      { timeSlot: "20:00", value: 58 },
      { timeSlot: "21:00", value: 65 },
      { timeSlot: "22:00", value: 75 },
      { timeSlot: "23:00", value: 72 },
    ],
  },
  {
    id: "blitz",
    name: "SuperSport Blitz",
    gender: [
      { name: "Male", value: 60, fill: "#0d5c2e" },
      { name: "Female", value: 40, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 20 },
      { ageGroup: "Age 25-34", percentage: 37 },
      { ageGroup: "Age 35-44", percentage: 27 },
      { ageGroup: "Age 45-54", percentage: 14 },
      { ageGroup: "Age 55-64", percentage: 2 },
      { ageGroup: "Age 65+", percentage: 0 },
    ],
    audienceFlow: [
      { timeSlot: "06:00", value: 45 },
      { timeSlot: "07:00", value: 42 },
      { timeSlot: "08:00", value: 40 },
      { timeSlot: "09:00", value: 38 },
      { timeSlot: "10:00", value: 35 },
      { timeSlot: "11:00", value: 38 },
      { timeSlot: "12:00", value: 35 },
      { timeSlot: "13:00", value: 30 },
      { timeSlot: "14:00", value: 28 },
      { timeSlot: "15:00", value: 27 },
      { timeSlot: "16:00", value: 28 },
      { timeSlot: "17:00", value: 30 },
      { timeSlot: "18:00", value: 33 },
      { timeSlot: "19:00", value: 42 },
      { timeSlot: "20:00", value: 38 },
      { timeSlot: "21:00", value: 35 },
      { timeSlot: "22:00", value: 65 },
      { timeSlot: "23:00", value: 55 },
    ],
  },
  {
    id: "rok",
    name: "ROK",
    gender: [
      { name: "Male", value: 42, fill: "#0d5c2e" },
      { name: "Female", value: 58, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 22 },
      { ageGroup: "Age 25-34", percentage: 36 },
      { ageGroup: "Age 35-44", percentage: 26 },
      { ageGroup: "Age 45-54", percentage: 15 },
      { ageGroup: "Age 55-64", percentage: 1 },
      { ageGroup: "Age 65+", percentage: 0 },
    ],
    audienceFlow: null, // report has text-only (Baseline, Peak, etc.)
  },
  {
    id: "trace",
    name: "Trace Naija",
    gender: [
      { name: "Male", value: 43, fill: "#0d5c2e" },
      { name: "Female", value: 57, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 27 },
      { ageGroup: "Age 25-34", percentage: 40 },
      { ageGroup: "Age 35-44", percentage: 23 },
      { ageGroup: "Age 45-54", percentage: 9 },
      { ageGroup: "Age 55-64", percentage: 1 },
      { ageGroup: "Age 65+", percentage: 0 },
    ],
    audienceFlow: [
      { timeSlot: "06:00", value: 3.0 },
      { timeSlot: "07:00", value: 3.5 },
      { timeSlot: "08:00", value: 3.5 },
      { timeSlot: "09:00", value: 4.0 },
      { timeSlot: "10:00", value: 6.0 },
      { timeSlot: "11:00", value: 5.5 },
      { timeSlot: "12:00", value: 5.0 },
      { timeSlot: "13:00", value: 5.0 },
      { timeSlot: "14:00", value: 3.0 },
      { timeSlot: "15:00", value: 3.5 },
      { timeSlot: "16:00", value: 3.5 },
      { timeSlot: "17:00", value: 4.0 },
      { timeSlot: "18:00", value: 5.5 },
      { timeSlot: "19:00", value: 4.5 },
      { timeSlot: "20:00", value: 4.5 },
      { timeSlot: "21:00", value: 4.0 },
      { timeSlot: "22:00", value: 3.5 },
      { timeSlot: "23:00", value: 3.5 },
    ],
  },
  {
    id: "premier-league",
    name: "Premier League",
    gender: [
      { name: "Male", value: 62, fill: "#0d5c2e" },
      { name: "Female", value: 38, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 20 },
      { ageGroup: "Age 25-34", percentage: 37 },
      { ageGroup: "Age 35-44", percentage: 28 },
      { ageGroup: "Age 45-54", percentage: 12 },
      { ageGroup: "Age 55-64", percentage: 3 },
      { ageGroup: "Age 65+", percentage: 0 },
    ],
    audienceFlow: [
      { timeSlot: "06:00", value: 10 },
      { timeSlot: "07:00", value: 11 },
      { timeSlot: "08:00", value: 12 },
      { timeSlot: "09:00", value: 13 },
      { timeSlot: "10:00", value: 14 },
      { timeSlot: "11:00", value: 18 },
      { timeSlot: "12:00", value: 25 },
      { timeSlot: "13:00", value: 32 },
      { timeSlot: "14:00", value: 38 },
      { timeSlot: "15:00", value: 42 },
      { timeSlot: "16:00", value: 48 },
      { timeSlot: "17:00", value: 65 },
      { timeSlot: "18:00", value: 65 },
      { timeSlot: "19:00", value: 85 },
      { timeSlot: "20:00", value: 100 },
      { timeSlot: "21:00", value: 80 },
      { timeSlot: "22:00", value: 60 },
      { timeSlot: "23:00", value: 40 },
    ],
  },
  {
    id: "football",
    name: "Football",
    gender: [
      { name: "Male", value: 60, fill: "#0d5c2e" },
      { name: "Female", value: 40, fill: "#5a9bd4" },
    ],
    ageGroups: [
      { ageGroup: "Age 18-24", percentage: 18 },
      { ageGroup: "Age 25-34", percentage: 39 },
      { ageGroup: "Age 35-44", percentage: 24 },
      { ageGroup: "Age 45-54", percentage: 16 },
      { ageGroup: "Age 55-64", percentage: 3 },
      { ageGroup: "Age 65+", percentage: 0 },
    ],
    audienceFlow: [
      { timeSlot: "06:00", value: 4 },
      { timeSlot: "07:00", value: 3 },
      { timeSlot: "08:00", value: 3 },
      { timeSlot: "09:00", value: 3 },
      { timeSlot: "10:00", value: 4 },
      { timeSlot: "11:00", value: 4 },
      { timeSlot: "12:00", value: 4 },
      { timeSlot: "13:00", value: 5 },
      { timeSlot: "14:00", value: 5 },
      { timeSlot: "15:00", value: 6 },
      { timeSlot: "16:00", value: 6 },
      { timeSlot: "17:00", value: 7 },
      { timeSlot: "18:00", value: 8 },
      { timeSlot: "19:00", value: 11 },
      { timeSlot: "20:00", value: 29 },
      { timeSlot: "21:00", value: 31 },
      { timeSlot: "22:00", value: 21 },
      { timeSlot: "23:00", value: 11 },
    ],
  },
];

/** Normalize a series to 0-100 for multi-line comparison */
function normalizeTo100(arr) {
  if (!arr?.length) return arr;
  const min = Math.min(...arr.map((d) => d.value));
  const max = Math.max(...arr.map((d) => d.value));
  const range = max - min || 1;
  return arr.map((d) => ({ ...d, value: Math.round(((d.value - min) / range) * 100) }));
}

/** Channels that have numeric audience flow (for multi-line chart) */
export const channelsWithFlow = audienceChannels.filter((c) => c.audienceFlow != null);

/** Multi-line data: one row per timeSlot, one dataKey per channel (normalized 0-100). timeSlot must match across channels. */
export const audienceFlowMultiLine = (() => {
  const slots = channelsWithFlow[0]?.audienceFlow?.map((d) => d.timeSlot) ?? [];
  const rows = slots.map((timeSlot) => {
    const row = { timeSlot };
    channelsWithFlow.forEach((ch) => {
      const point = ch.audienceFlow.find((p) => p.timeSlot === timeSlot);
      if (point) row[ch.id] = point.value;
    });
    return row;
  });
  // Normalize each channel's series to 0-100
  channelsWithFlow.forEach((ch) => {
    const vals = rows.map((r) => r[ch.id]).filter((v) => v != null);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    rows.forEach((r, i) => {
      if (r[ch.id] != null) r[ch.id] = Math.round(((r[ch.id] - min) / range) * 100);
    });
  });
  return rows;
})();

/** Average gender across all channels (for overview) */
export const audienceAverageGender = (() => {
  const male = audienceChannels.reduce((s, c) => s + c.gender[0].value, 0) / audienceChannels.length;
  const female = audienceChannels.reduce((s, c) => s + c.gender[1].value, 0) / audienceChannels.length;
  return [
    { name: "Male", value: Math.round(male), fill: "#0d5c2e" },
    { name: "Female", value: Math.round(female), fill: "#5a9bd4" },
  ];
})();

/** Average age distribution across all channels (same age group order) */
const ageOrder = ["Age 18-24", "Age 25-34", "Age 35-44", "Age 45-54", "Age 55-64", "Age 65+"];
export const audienceAverageAgeGroups = (() => {
  const sums = ageOrder.map(() => 0);
  audienceChannels.forEach((c) => {
    c.ageGroups.forEach((a, i) => {
      const idx = ageOrder.indexOf(a.ageGroup);
      if (idx >= 0) sums[idx] += a.percentage;
    });
  });
  return ageOrder.map((ageGroup, i) => ({
    ageGroup,
    percentage: Math.round(sums[i] / audienceChannels.length),
  }));
})();
