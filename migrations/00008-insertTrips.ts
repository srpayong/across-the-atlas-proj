import { Sql } from 'postgres';

export const trips = [
  {
    id: 1,
    userId: 2,
    blogId: 2,
    blogName: 'Travel Destination for Ancient History',
    name: 'History & Culture',
    category: 'History & Culture',
    location: 'Ethiopia',
    description:
      'Showcasing the very best of Ethiopia fascinating history and unique cultural identities, as well as its beautiful natural scenes and other-worldly landscapes.',
    image_url: '/images/trips/ethiopia.jpeg',
  },
  {
    id: 2,
    userId: 2,
    blogId: 2,
    blogName: 'Granaries, Kasbahs & Feasts',
    name: 'Morocco Journey',
    category: 'Food and Drink',
    location: 'Morocco',
    description:
      'Morocco is a colorful country where traditional craftsmanship continues to be practiced and proudly displayed, and this is especially true of the rich culinary tradition. You see it in the open-air food markets, smell it in the aroma of secret spice blends wafting out of windows, and you taste it in every meal.',
    image_url: '/images/trips/morocco.jpeg',
  },
  {
    id: 3,
    userId: 1,
    blogId: 1,
    blogName: 'Spiritual North India',
    name: 'Temples & Traditions',
    category: 'History & Culture',
    location: 'India',
    description:
      'Uncover their ancient spirituality on this trip to its most holy sites, gaining a unique insight into the countrys beautiful blend of belief systems, and perhaps yourself.',
    image_url: '/images/trips/india.jpeg',
  },
  {
    id: 4,
    userId: 3,
    blogId: 3,
    blogName: 'Nature, Adventure, Wildlife',
    name: 'Brazilian Adventure',
    category: 'Wildlife & Safari',
    location: 'Brazil',
    description:
      'Experience the unique and breathtaking nature and amazing variety of flora and fauna in the Amazon and the Pantanal in Brazil. Apart from exotic plants and giant trees, you will have the chance to see countless bird species, different monkeys, caimans, anteaters, tapirs, and even jaguars.',
    image_url: '/images/trips/brazil.jpeg',
  },
  {
    id: 5,
    userId: 4,
    blogId: 4,
    blogName: 'Inca Trail Machu Picchu',
    name: 'Breathtaking Peru',
    category: 'Hiking & Trekking',
    location: 'Peru',
    description:
      'Go out of your comfort zone and explore the Iconic Inca Trail hike; enjoy the natural wonders, visit the ancient Inca sites, interact with our local porters, and experience the best of Peruvian food while you meet new friends and arrive in Machu Picchu through the mountains.',
    image_url: '/images/trips/peru.jpeg',
  },
  {
    id: 6,
    userId: 1,
    blogId: 1,
    blogName: 'Oaxaca of Past & Present',
    name: 'Oaxaca and beyond',
    category: 'Food and Drink',
    location: 'Mexico',
    description:
      'In Oaxaca, a tortilla isnt just a tortilla. Corn is the basis of life, chiles exist in a variety of colors and shapes, and sauces like mole can have more than 30 ingredients—and take three days to prepare. With a largely indigenous population, Oaxaca has held tight to many of its longstanding traditions in the face of modernity. ',
    image_url: '/images/trips/oaxaca.jpeg',
  },
  {
    id: 7,
    userId: 1,
    blogId: 1,
    blogName: 'Kilauea Volcano',
    name: 'Discover Hawaii',
    category: 'Adventure',
    location: 'Hawaii',
    description:
      'An exciting Kilauea volcano adventure, scour fields of jet black lava in search of volcanic activity, from steaming vents to gaping volcanic craters. Trek through the Thurston Lava Tube and In addition to the sights in Hawaii Volcanoes National Park, also make trips to Rainbow Falls.',
    image_url: '/images/trips/hawaii.jpeg',
  },
  {
    id: 8,
    userId: 1,
    blogId: 1,
    blogName: 'Mesmerizing Mahe & Praslin',
    name: 'Seychelles Beauty',
    category: 'Beach',
    location: 'Seychelles',
    description:
      'Get away from the pressures of everyday life and revitalize both your body and mind with a Seychelles holiday. Enjoy the amazing beaches and the warm turquoise waters of the Indian Ocean as you lose yourself in the tranquil setting of the island once declared the rediscovered Garden of Eden.',
    image_url: '/images/trips/seychelles.jpeg',
  },
  {
    id: 9,
    userId: 3,
    blogId: 1,
    blogName: 'Philippines Adventures',
    name: 'Beach to Mountain',
    category: 'Beach',
    location: 'Philippines',
    description:
      'Comprised of over 7,000 islands, the Philippines is a tropical paradise that offers something for everyone. From the white-sand beaches of Boracay to the stunning rice terraces of Banaue, from the vibrant streets of Manila to the pristine waters of Palawan, the Philippines is a destination that is sure to leave you in awe.',
    image_url: '/images/trips/philippines.jpeg',
  },
  {
    id: 10,
    userId: 1,
    blogId: 1,
    blogName: 'Ice Cave',
    name: 'Ice Caves | Glacier Walk',
    category: 'Adventure',
    location: 'Iceland',
    description:
      'Experience Langjökull Icelands second-largest glacier and enjoy the rare sight of blue ice at the heart of an ice cap glacier from Reykjavik. Walk through the glaciers corridors and learn about geology, the history of glaciers, how they are formed, and how they move.',
    image_url: '/images/trips/iceland.jpeg',
  },
  {
    id: 11,
    userId: 3,
    blogId: 3,
    blogName: 'The Great Migration',
    name: 'The Magic of the Mara',
    category: 'Wildlife & Safari',
    location: 'Kenya',
    description:
      'The Great Migration is one of the largest herd movement of animals on the planet. The numbers are astonishing: over 1.2 million wildebeest and 300,000 zebra along with topi and other gazelle move in a constant cycle through the Serengeti-Mara ecosystem in search of nutritious grass and water. ',
    image_url: '/images/trips/kenya.jpeg',
  },
  {
    id: 12,
    userId: 4,
    blogId: 4,
    blogName: 'Everest Base Camp Trek',
    name: 'Beyond Your Wildest Dreams',
    category: 'Hiking & Trekking',
    location: 'Nepal',
    description:
      'Everest is more than a mountain and the journey to its base camp is more than just a trek. Along a route dubbed by some as "the steps to heaven," every bend in the trail provides another photo opportunity — beautiful forests, Sherpa villages, glacial moraines, and foothills.',
    image_url: '/images/trips/nepal.jpeg',
  },
];

export async function up(sql: Sql) {
  for (const trip of trips) {
    await sql`
      INSERT INTO
        trips (
          name,
          user_id,
          blog_id,
          blog_name,
          category,
          location,
          description,
          image_url
        )
      VALUES
        (
          ${trip.name},
          ${trip.userId},
          ${trip.blogId},
          ${trip.blogName},
          ${trip.category},
          ${trip.location},
          ${trip.description},
          ${trip.image_url}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const trip of trips) {
    await sql`
      DELETE FROM trips
      WHERE
        id = ${trip.id}
    `;
  }
}
