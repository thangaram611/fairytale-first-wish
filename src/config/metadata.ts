// Single source of truth for all invitation and metadata details
export const invitationDetails = {
  babyName: "Princess Taneira",
  age: "1st",
  date: "November 28, 2025",
  time: "5:00 PM onwards",
  venue: "Zaitoon Restaurant, Velachery, Chennai",
};

export const metadata = {
  title: "Birthday Invitation - Join Our Magical Celebration! 👑",
  description: "You're invited to a magical princess celebration! Date: " + invitationDetails.date + " | Time: " + invitationDetails.time + " | Venue: " + invitationDetails.venue + ". Join us for a royal first birthday party!",
  author: "Taneira's Family",
  
  // Open Graph metadata
  og: {
    title: "👑 Princess Taneira First Birthday Party Invitation",
    description: `🎂 Celebrating ${invitationDetails.age} Birthday
📅 Date: ${invitationDetails.date}
🕐 Time: ${invitationDetails.time}
📍 Venue: ${invitationDetails.venue}
Join us for a magical royal celebration!`,
    type: "website",
    image: "https://lovable.dev/opengraph-image-p98pqg.png",
  },
  
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "1st Birthday Invitation",
    image: "https://lovable.dev/opengraph-image-p98pqg.png",
  },
};
