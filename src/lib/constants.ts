

// Namespace imports (Easier to manage)
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";

export const SOCIAL_LINKS = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/maksudpranto/",
        // Note: When using namespace imports, use Fa.FaLinkedinIn
        icon: Fa.FaLinkedinIn,
        color: "#0A66C2",
        label: "LinkedIn"
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/03pranto/",
        icon: Fa.FaFacebook,
        color: "#1877F2",
        label: "Facebook"
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/praaan__to/",
        icon: Fa6.FaInstagram,
        color: "#E4405F",
        label: "Instagram"
    },
    {
        name: "Email",
        href: "mailto:maksudpranto@gmail.com",
        icon: Io.IoMdMailOpen,
        color: "#EA4335",
        label: "Email"
    }
];

export const PHOTOS = [
    {
        id: 1,
        title: "Into the Ocean",
        location: "Teknaf, Cox's Bazar, Bangladesh",
        date: "Oct 2023",
        category: "Nature",
        image: "/images/IMG_0092.jpg",
        aspect: "aspect-video",
    },
    {
        id: 2,
        title: "Kyoto After Rain",
        location: "Kashiani, Bangladesh",
        date: "May 2023",
        category: "Urban",
        image: "/images/kashiani.JPG",
        aspect: "aspect-[4/4]",
    },
    {
        id: 3,
        title: "Misty Valleys",
        location: "Sapa, Vietnam",
        date: "Aug 2023",
        category: "Nature",
        image: "/images/travel_mountain_peak.png",
        aspect: "aspect-[4/5]",
    },
    {
        id: 4,
        title: "Midnight Neon",
        location: "Shibuya, Tokyo",
        date: "May 2023",
        category: "Urban",
        image: "/images/travel_kyoto_street.png",
        aspect: "aspect-square",
    },
    {
        id: 5,
        title: "Ocean Solitude",
        location: "Bali, Indonesia",
        date: "Jan 2024",
        category: "Moments",
        image: "/images/travel_mountain_peak.png",
        aspect: "aspect-video",
    }
];

export const BLOG_POSTS = [
    {
        id: 1,
        title: "Lessons from the Road: What Solo Travel Taught Me About Resilience",
        excerpt: "Standing alone in a bustling Shibuya crossing, I realized that navigating a foreign city is much like debugging a complex system: patience, observation, and a willingness to fail are your best tools.",
        date: "Jan 15, 2024",
        location: "Tokyo, Japan",
        category: "Lessons",
        slug: "lessons-shibuya-resilience",
        content: `
            <p>Standing alone in a bustling Shibuya crossing, I realized that navigating a foreign city is much like debugging a complex system: patience, observation, and a willingness to fail are your best tools.</p>
            <p>The lights turned green, and thousands of people flooded the intersection. It was chaos, but organized chaos. Everyone had a destination, a purpose, and a slight awareness of the personal space of others—just enough to avoid collision.</p>
            <p>I took a deep breath and stepped forward. In that moment, I wasn't just a tourist; I was a variable in a massive, executing function.</p>
        `
    },
    {
        id: 2,
        title: "The Parallelism of Bug Hunting and Navigation",
        excerpt: "Whether it's finding a memory leak or finding a hidden temple in the misty valleys of Sapa, the thrill is in the pursuit. It's about looking beyond the obvious signs.",
        date: "Oct 22, 2023",
        location: "Sapa, Vietnam",
        category: "Reflections",
        slug: "bug-hunting-vs-navigation",
        content: `
            <p>Whether it's finding a memory leak or finding a hidden temple in the misty valleys of Sapa, the thrill is in the pursuit. It's about looking beyond the obvious signs.</p>
            <p>In Sapa, the mist rolls in thick and fast. One moment you see the rice terraces, the next, you're enveloped in white. You have to trust your internal compass, or in the case of coding, your understanding of the system architecture.</p>
            <p>Bug hunting is no different. The error logs are your mist. They obscure the root cause, distracting you with symptoms. You have to peel back the layers, verify your assumptions, and keep moving forward.</p>
        `
    },
    {
        id: 3,
        title: "Finding Balance: Coding from a Cafe in Kyoto",
        excerpt: "The rhythmic click of my keyboard blended with the soft murmur of the Kamo River. Here, work didn't feel like a chore; it felt like a part of the journey.",
        date: "May 10, 2023",
        location: "Kyoto, Japan",
        category: "Work-Life",
        slug: "coding-in-kyoto",
        content: `
            <p>The rhythmic click of my keyboard blended with the soft murmur of the Kamo River. Here, work didn't feel like a chore; it felt like a part of the journey.</p>
            <p>Kyoto has a way of slowing time. The ancient temples stand in stark contrast to the modern efficiency of the trains. It’s a city of duality, much like the life of a digital nomad.</p>
            <p>I sat there, sipping matcha, refactoring a particularly messy module. The environment influenced the code. It became cleaner, simpler, more intentional. Balance isn't found; it's created, line by line, moment by moment.</p>
        `
    },
    {
        id: 4,
        title: "Saintmartin",
        excerpt: "The rhythmic click of Saintmartin.",
        date: "May 10, 2023",
        location: "Kyoto, Japan",
        category: "Work-Life",
        slug: "saintmartin",
        content: `
            <p>The rhythmic click of my keyboard blended with the soft murmur of the Kamo River. Here, work didn't feel like a chore; it felt like a part of the journey.</p>
            <p>Kyoto has a way of slowing time. The ancient temples stand in stark contrast to the modern efficiency of the trains. It’s a city of duality, much like the life of a digital nomad.</p>
            <p>I sat there, sipping matcha, refactoring a particularly messy module. The environment influenced the code. It became cleaner, simpler, more intentional. Balance isn't found; it's created, line by line, moment by moment.</p>
        `
    }
];
