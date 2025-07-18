export interface ClipData {
  id: string;
  title: string;
  date: string;
  time: string;
  thumbnail: string;
  timestamp: string;
  duration: string;
  aspectRatio: string;
  rating: number;
  tags: string[];
  event: string;
  status: {
    name: string;
    color: string;
    background: string;
  };
  selected?: boolean;
  hasAI?: boolean;
}

export const mockClipData: ClipData[] = [
  {
    id: "1",
    title: "Lineups",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690594400/catalog/1685096358785175552/upkvqobmwabmuua9upta.jpg",
    timestamp: "00:10:47 - 00:11:37",
    duration: "00:00:50",
    aspectRatio: "16:9",
    rating: 4,
    tags: ["Lineups"],
    event: "Goal",
    status: { name: "Published", color: "#FFF", background: "#00CF45" },
    selected: false,
  },
  {
    id: "2",
    title: "Dangerous attack 05",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_400/v1690594431/catalog/1685096358785175552/d1gf6aglkusikanteyhz.jpg",
    timestamp: "00:02:00 - 00:10:00",
    duration: "00:08:00",
    aspectRatio: "16:9",
    rating: 5,
    tags: ["Shots on target", "Save", "Free kick", "+2"],
    event: "Corner kick",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
    hasAI: true,
  },
  {
    id: "3",
    title: "1st attack",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_400/v1690594421/catalog/1685096358785175552/wpl997ecb9dxpia7lctv.jpg",
    timestamp: "00:15:10 - 00:15:42",
    duration: "00:00:32",
    aspectRatio: "16:9",
    rating: 3,
    tags: ["Throw in", "Foul"],
    event: "Free kick",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
  },
  {
    id: "4",
    title: "1st foul",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690594400/catalog/1685096358785175552/upkvqobmwabmuua9upta.jpg",
    timestamp: "00:16:30 - 00:17:02",
    duration: "00:00:32",
    aspectRatio: "16:9",
    rating: 4,
    tags: ["Offside"],
    event: "Foul",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
    hasAI: true,
  },
  {
    id: "5",
    title: "Lineups",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_400/v1690594431/catalog/1685096358785175552/d1gf6aglkusikanteyhz.jpg",
    timestamp: "00:10:47 - 00:11:37",
    duration: "00:00:50",
    aspectRatio: "16:9",
    rating: 4,
    tags: ["Lineups"],
    event: "Goal",
    status: { name: "Published", color: "#FFF", background: "#00CF45" },
    selected: false,
  },
  {
    id: "6",
    title: "Dangerous attack 05",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_400/v1690594421/catalog/1685096358785175552/wpl997ecb9dxpia7lctv.jpg",
    timestamp: "00:02:00 - 00:10:00",
    duration: "00:08:00",
    aspectRatio: "16:9",
    rating: 5,
    tags: ["Shots on target", "Save", "Free kick", "+2"],
    event: "Corner kick",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
    hasAI: true,
  },
  {
    id: "7",
    title: "1st attack",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690594400/catalog/1685096358785175552/upkvqobmwabmuua9upta.jpg",
    timestamp: "00:15:10 - 00:15:42",
    duration: "00:00:32",
    aspectRatio: "16:9",
    rating: 3,
    tags: ["Throw in", "Foul"],
    event: "Free kick",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
  },
  {
    id: "8",
    title: "1st foul",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_400/v1690594431/catalog/1685096358785175552/d1gf6aglkusikanteyhz.jpg",
    timestamp: "00:16:30 - 00:17:02",
    duration: "00:00:32",
    aspectRatio: "16:9",
    rating: 4,
    tags: ["Offside"],
    event: "Foul",
    status: { name: "Unpublished", color: "#FFF", background: "#252525" },
    selected: false,
  },
  {
    id: "9",
    title: "Lineups",
    date: "Jun 26, 2025",
    time: "12:10",
    thumbnail: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690594400/catalog/1685096358785175552/upkvqobmwabmuua9upta.jpg",
    timestamp: "00:10:47 - 00:11:37",
    duration: "00:00:50",
    aspectRatio: "16:9",
    rating: 4,
    tags: ["Lineups"],
    event: "Goal",
    status: { name: "Published", color: "#FFF", background: "#00CF45" },
    selected: false,
  },
];
