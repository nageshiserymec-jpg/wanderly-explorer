/**
 * Curated destination dataset.
 * NOTE: no image URLs here on purpose — every image is fetched at runtime
 * from the image API using the destination / place name as the search query.
 */

export const REGIONS = ["All", "Asia", "Europe", "Middle East", "America"];

export const destinations = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    tagline: "Boulevards, bakeries and belle époque light",
    description:
      "Paris rewards slow walking. Between the Seine's bridges and the hilltop lanes of Montmartre you'll find world-class museums, corner cafés and an unhurried café culture that turns an afternoon into an event.",
    bestTime: "April – June",
    currency: "Euro (EUR)",
    language: "French",
    latitude: 48.8566,
    longitude: 2.3522,
    famousPlaces: [
      {
        name: "Eiffel Tower",
        category: "Landmark",
        description:
          "The iron lattice icon of Paris. Come at dusk for the hourly sparkle over the Champ de Mars.",
      },
      {
        name: "Louvre Museum",
        category: "Museum",
        description:
          "The world's most visited museum, from ancient Egypt to the Mona Lisa, wrapped in a glass pyramid courtyard.",
      },
      {
        name: "Montmartre",
        category: "Neighbourhood",
        description:
          "Cobbled streets, artists' squares and the white domes of Sacré-Cœur above the rooftops.",
      },
      {
        name: "Musée d'Orsay",
        category: "Museum",
        description:
          "Impressionist masterpieces inside a magnificent former railway station on the Left Bank.",
      },
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    tagline: "Neon futures layered over quiet shrines",
    description:
      "Tokyo is dozens of cities in one. Trade the crossing-lights of Shibuya for incense smoke in Asakusa, then finish in a six-seat counter restaurant where the chef remembers your name.",
    bestTime: "March – May",
    currency: "Japanese Yen (JPY)",
    language: "Japanese",
    latitude: 35.6762,
    longitude: 139.6503,
    famousPlaces: [
      {
        name: "Senso-ji Temple",
        category: "Temple",
        description:
          "Tokyo's oldest temple, approached through the lantern-hung market street of Nakamise-dori.",
      },
      {
        name: "Shibuya Crossing",
        category: "Landmark",
        description:
          "The world's busiest pedestrian scramble — best watched from a café window above the chaos.",
      },
      {
        name: "Meiji Shrine",
        category: "Shrine",
        description:
          "A forest of 100,000 donated trees hiding a serene Shinto shrine in the middle of the city.",
      },
      {
        name: "Tokyo Skytree",
        category: "Viewpoint",
        description:
          "At 634 m, the tallest tower in Japan, with a clear-day view stretching to Mount Fuji.",
      },
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    tagline: "Desert horizons and record-breaking skylines",
    description:
      "Dubai runs on ambition. Glass towers rise straight out of the sand, gold souks trade the old-fashioned way, and an hour's drive puts you in silent dunes at sunset.",
    bestTime: "November – March",
    currency: "UAE Dirham (AED)",
    language: "Arabic, English",
    latitude: 25.2048,
    longitude: 55.2708,
    famousPlaces: [
      {
        name: "Burj Khalifa",
        category: "Landmark",
        description:
          "The tallest building on earth. Book the sunset slot at the observation deck well ahead.",
      },
      {
        name: "Dubai Marina",
        category: "Neighbourhood",
        description: "A yacht-lined canal district that comes alive after dark along the boardwalk.",
      },
      {
        name: "Gold Souk",
        category: "Market",
        description:
          "Hundreds of shopfronts in Deira glittering with gold — haggling is entirely expected.",
      },
      {
        name: "Desert Safari Dunes",
        category: "Nature",
        description:
          "Red dunes outside the city for dune drives, camel rides and star-clear night skies.",
      },
    ],
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    tagline: "Royal history with a restless creative edge",
    description:
      "London stacks centuries on top of each other. A Norman fortress, a Victorian market and a converted power station gallery can all fit into one very walkable day.",
    bestTime: "May – September",
    currency: "Pound Sterling (GBP)",
    language: "English",
    latitude: 51.5074,
    longitude: -0.1278,
    famousPlaces: [
      {
        name: "Tower Bridge",
        category: "Landmark",
        description:
          "The Victorian bascule bridge over the Thames, with a glass walkway high above the river.",
      },
      {
        name: "British Museum",
        category: "Museum",
        description:
          "Two million years of human history under Norman Foster's great glass-roofed court. Free entry.",
      },
      {
        name: "Borough Market",
        category: "Market",
        description:
          "A thousand-year-old food market — go hungry, and go before noon on a weekday.",
      },
      {
        name: "Hyde Park",
        category: "Park",
        description:
          "350 acres of green in the middle of the city, with boating on the Serpentine in summer.",
      },
    ],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    tagline: "Rice terraces, temple gates and long slow surf",
    description:
      "Bali balances ceremony and stillness. Mornings belong to offerings and mist over the terraces; afternoons belong to the water; evenings belong to a warung table by the road.",
    bestTime: "April – October",
    currency: "Indonesian Rupiah (IDR)",
    language: "Indonesian, Balinese",
    latitude: -8.4095,
    longitude: 115.1889,
    famousPlaces: [
      {
        name: "Tanah Lot Temple",
        category: "Temple",
        description:
          "A sea temple perched on a rock formation, dramatic at low tide and unmissable at sunset.",
      },
      {
        name: "Tegallalang Rice Terraces",
        category: "Nature",
        description:
          "Sculpted emerald terraces north of Ubud, worked by the centuries-old subak irrigation system.",
      },
      {
        name: "Ubud Monkey Forest",
        category: "Nature",
        description:
          "A sacred nature reserve of banyan trees, moss-covered statues and very confident macaques.",
      },
      {
        name: "Uluwatu Temple",
        category: "Temple",
        description:
          "A clifftop temple 70 m above the Indian Ocean, with fire-lit Kecak dance at sundown.",
      },
    ],
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "America",
    tagline: "The city that sets the pace for everywhere else",
    description:
      "New York is best taken in neighbourhoods. Museum mile in the morning, a slice downtown, a park-side bench at golden hour and a small jazz room long after midnight.",
    bestTime: "September – November",
    currency: "US Dollar (USD)",
    language: "English",
    latitude: 40.7128,
    longitude: -74.006,
    famousPlaces: [
      {
        name: "Central Park",
        category: "Park",
        description:
          "843 acres of designed wilderness cutting through Manhattan — rent a bike and cover the loop.",
      },
      {
        name: "Statue of Liberty",
        category: "Landmark",
        description:
          "The harbour icon on Liberty Island; the free Staten Island Ferry gives a great look for nothing.",
      },
      {
        name: "The High Line",
        category: "Park",
        description:
          "A disused elevated freight line replanted as a wild garden walk above the West Side.",
      },
      {
        name: "Brooklyn Bridge",
        category: "Landmark",
        description:
          "Walk the wooden promenade at sunrise for the skyline without the crowds.",
      },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    tagline: "An open-air museum that still serves great coffee",
    description:
      "In Rome the ruins are not behind glass — they're on your walk to dinner. Layer imperial forums, baroque fountains and a long lunch in Trastevere and you have the perfect day.",
    bestTime: "April – June",
    currency: "Euro (EUR)",
    language: "Italian",
    latitude: 41.9028,
    longitude: 12.4964,
    famousPlaces: [
      {
        name: "Colosseum",
        category: "Landmark",
        description:
          "The largest amphitheatre ever built, still standing after nearly two thousand years.",
      },
      {
        name: "Vatican Museums",
        category: "Museum",
        description:
          "Miles of galleries leading, finally, to Michelangelo's Sistine Chapel ceiling.",
      },
      {
        name: "Trevi Fountain",
        category: "Landmark",
        description:
          "Baroque theatre in travertine and water. Come at 7am if you want it to yourself.",
      },
      {
        name: "Pantheon",
        category: "Landmark",
        description:
          "A 2,000-year-old concrete dome with an open oculus that still has engineers puzzled.",
      },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    tagline: "A garden city engineered down to the last detail",
    description:
      "Singapore is compact, green and effortless to navigate. Hawker centres serve some of the best cheap food on the planet, minutes from supertrees and colonial shophouses.",
    bestTime: "February – April",
    currency: "Singapore Dollar (SGD)",
    language: "English, Malay, Mandarin, Tamil",
    latitude: 1.3521,
    longitude: 103.8198,
    famousPlaces: [
      {
        name: "Gardens by the Bay",
        category: "Nature",
        description:
          "Solar supertrees and cooled conservatories; the light show at 7.45pm is free and excellent.",
      },
      {
        name: "Marina Bay Sands",
        category: "Landmark",
        description:
          "Three towers under a ship-shaped sky park with the city's defining infinity view.",
      },
      {
        name: "Chinatown",
        category: "Neighbourhood",
        description:
          "Restored shophouses, temples and the hawker stalls of Maxwell Food Centre.",
      },
      {
        name: "Sentosa Island",
        category: "Beach",
        description: "Beaches, cable cars and theme parks a short monorail ride from downtown.",
      },
    ],
  },
];

export function getDestinationById(id) {
  return destinations.find((destination) => destination.id === id);
}
