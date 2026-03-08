/**
 * Campaign data from markdown reports (single source of truth).
 */

export const terrestrial = {
  decJan: { householdsReachedM: 29.6, spots: 514, avgFrequency: 9.2, totalTVR: 2175.4, impacts: 29965698 },
  feb: { householdsReachedM: 35.6, spots: 1020, avgFrequency: 13.1, totalTVR: 2687.7, impacts: 35588425 },
};

export const cable = {
  decJan: { householdsReachedM: 20.1, spots: 750, avgFrequency: 7.0, grps: 2595 },
  feb: { householdsReachedM: 21.2, spots: 871, avgFrequency: 9.9, grps: 2739 },
};

export const dstv = {
  decJan: { totalTVR: 1830.2, impacts: 8361264, insertions: 403, avgFrequency: 7.5, householdsReachedM: 8.4 },
  feb: { totalTVR: 1779.7, impacts: 10744050, insertions: 574, avgFrequency: 11.4, householdsReachedM: 10.7 },
};

export const gotv = {
  decJan: { totalTVR: 1665.8, impacts: 10347466, insertions: 370, avgFrequency: 6.5, householdsReachedM: 10.4 },
  feb: { totalTVR: 1080.3, impacts: 10527443, insertions: 297, avgFrequency: 8.4, householdsReachedM: 10.5 },
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
  { channel: "CNN", tvr: 375.6, impacts: 1777689 },
  { channel: "Arise News", tvr: 325.1, impacts: 5315702 },
  { channel: "Channels TV", tvr: 329.0, impacts: 3794015 },
  { channel: "AIT Network", tvr: 234.5, impacts: 1517148 },
  { channel: "Zee World", tvr: 207.1, impacts: 4789274 },
  { channel: "NTA Network", tvr: 215.3, impacts: 12862189 },
  { channel: "ROK2", tvr: 164.8, impacts: 1193013 },
  { channel: "TVC", tvr: 177.0, impacts: 1450689 },
  { channel: "SuperSport Blitz", tvr: 136.4, impacts: 586912 },
  { channel: "ROK", tvr: 136.4, impacts: 871216 },
  { channel: "SuperSport Motorsport", tvr: 101.6, impacts: 256504 },
  { channel: "SuperSport Golf", tvr: 90.3, impacts: 103728 },
  { channel: "SuperSport Tennis", tvr: 78.3, impacts: 99012 },
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

/** For period-over-period line/area charts */
export const periodTimeline = [
  { period: "Dec/Jan", cableHH: 20.1, terrestrialHH: 29.6, cableSpots: 750, terrestrialSpots: 514, cableFreq: 7.0, terrestrialFreq: 9.2 },
  { period: "Feb", cableHH: 21.2, terrestrialHH: 35.6, cableSpots: 871, terrestrialSpots: 1020, cableFreq: 9.9, terrestrialFreq: 13.1 },
];

/** Terrestrial campaign performance by program (Funita Campaign Performance Report) */
export const terrestrialProgramsFeb = [
  { channel: "Arise News", program: "THE MORNING SHOW (Ayo Mairo - Ese, Reuben & Rufai)", totalTVR: 325.1, impacts: 5315702, insertions: 20, avgFrequency: 6.8 },
  { channel: "Arewa TV", program: "ROS", totalTVR: 116.3, impacts: 971334, insertions: 33, avgFrequency: 2.4 },
  { channel: "AIT Network", program: "KAKAKI", totalTVR: 98.6, impacts: 769001, insertions: 20, avgFrequency: 3.5 },
  { channel: "AIT Network", program: "NEWS @ 8PM", totalTVR: 135.9, impacts: 748147, insertions: 20, avgFrequency: 3.7 },
  { channel: "Channels TV", program: "POLITICS TODAY (Seun Okinbaloye)", totalTVR: 176.1, impacts: 826012, insertions: 20, avgFrequency: 6.1 },
  { channel: "Channels TV", program: "NEWS @ 10PM", totalTVR: 152.9, impacts: 2968003, insertions: 20, avgFrequency: 3.1 },
  { channel: "NTA Network", program: "NEWS @ 9PM", totalTVR: 116.4, impacts: 6455163, insertions: 20, avgFrequency: 6.7 },
  { channel: "NTA Network", program: "NEWSLINE", totalTVR: 98.9, impacts: 6407026, insertions: 20, avgFrequency: 8.2 },
  { channel: "TVC", program: "YOUR VIEW", totalTVR: 85.4, impacts: 785430, insertions: 30, avgFrequency: 4.1 },
  { channel: "TVC", program: "NEWS @ 10PM", totalTVR: 91.6, impacts: 665259, insertions: 30, avgFrequency: 3.9 },
  { channel: "Zee World", program: "8pm - 9pm Belt", totalTVR: 207.1, impacts: 4789274, insertions: 123, avgFrequency: 6.2 },
  { channel: "ROK", program: "TACTICAL SPONSORSHIP", totalTVR: 136.4, impacts: 871216, insertions: 156, avgFrequency: 5.9 },
  { channel: "ROK2", program: "—", totalTVR: 164.8, impacts: 1193013, insertions: 120, avgFrequency: 6.1 },
  { channel: "CNN", program: "TACTICAL ASSOCIATION", totalTVR: 375.6, impacts: 1777689, insertions: 186, avgFrequency: 6.3 },
  { channel: "SuperSport Blitz", program: "—", totalTVR: 136.4, impacts: 586912, insertions: 55, avgFrequency: 4.2 },
  { channel: "SuperSport Tennis", program: "—", totalTVR: 78.3, impacts: 99012, insertions: 50, avgFrequency: 5.9 },
  { channel: "SuperSport Motorsport", program: "—", totalTVR: 101.6, impacts: 256504, insertions: 46, avgFrequency: 5.8 },
  { channel: "SuperSport Golf", program: "—", totalTVR: 90.3, impacts: 103728, insertions: 51, avgFrequency: 5.6 },
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
  { channel: "ROK2", program: "—", totalTVR: 128.2, impacts: 844008, insertions: 44, avgFrequency: 3.9 },
  { channel: "CNN", program: "TACTICAL ASSOCIATION", totalTVR: 184.2, impacts: 1311716, insertions: 20, avgFrequency: 5.6 },
  { channel: "SuperSport Tennis", program: "—", totalTVR: 11.3, impacts: 52377, insertions: 29, avgFrequency: 5.4 },
  { channel: "SuperSport Motorsport", program: "—", totalTVR: 91.7, impacts: 211257, insertions: 28, avgFrequency: 5.7 },
  { channel: "SuperSport Golf", program: "—", totalTVR: 51.3, impacts: 74848, insertions: 30, avgFrequency: 5.5 },
];

/** CNN audience demographics (Funita: Your Target Customers spend time watching CNN) */
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

/** CNN audience flow 06:00–24:00 (Mon-Fri values from report; timeSlot = hour label) */
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
