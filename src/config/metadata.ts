// Single source of truth for all invitation and metadata details
export const invitationDetails = {
  babyName: "Princess Taneira",
  age: "1st",
  date: "November 28, 2025",
  time: "5:00 PM onwards",
  venue: "Zaitoon Restaurant, Velachery, Chennai",
};

export const metadata = {
  title: "👑 Princess Taneira's 1st Birthday - Join Our Magical Celebration!",
  description: "You're invited to a magical princess celebration! 🎂 Date: " + invitationDetails.date + " | ⏰ Time: " + invitationDetails.time + " | 📍 Venue: " + invitationDetails.venue + ". Join us for a royal first birthday party filled with joy and wonder!",
  author: "Taneira's Family",
  
  // Open Graph metadata - optimized for WhatsApp sharing
  og: {
    title: "👑 Princess Taneira's First Birthday Celebration!",
    description: `🎂 Celebrating 1st Birthday!

📅 Date: ${invitationDetails.date}
🕐 Time: ${invitationDetails.time}
📍 Venue: ${invitationDetails.venue}

👗 Dress Code: Light Pink or Lilac

Join us for a magical royal celebration! ✨`,
    type: "website",
    image: "/og-image.jpg", // Will be resolved to full URL at runtime
    imageAlt: "Princess Taneira's magical first birthday celebration invitation",
  },
  
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: "1st Birthday Invitation",
    image: "/og-image.jpg", // Will be resolved to full URL at runtime
    imageAlt: "Princess Taneira's magical first birthday celebration invitation",
  },
};
