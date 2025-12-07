import React from 'react';
import { Github, Linkedin, Instagram, Mail, Facebook, Twitter, Youtube, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const MotionA = motion.a;

const iconMap: { [key: string]: any } = {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Globe
};

const SocialLinks: React.FC = () => {
  const socialLinks = useQuery(api.socialLinks.get);

  if (!socialLinks) {
    return null; // Or a loading skeleton
  }

  const activeLinks = socialLinks.filter(link => link.isActive);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Globe;
  };

  const getColor = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('github')) return 'hover:bg-[#333] hover:border-[#333]';
    if (lowerPlatform.includes('linkedin')) return 'hover:bg-[#0077b5] hover:border-[#0077b5]';
    if (lowerPlatform.includes('instagram')) return 'hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:border-pink-500';
    if (lowerPlatform.includes('gmail') || lowerPlatform.includes('mail')) return 'hover:bg-[#EA4335] hover:border-[#EA4335]';
    if (lowerPlatform.includes('facebook')) return 'hover:bg-[#1877F2] hover:border-[#1877F2]';
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return 'hover:bg-black hover:border-black';
    return 'hover:bg-purple-600 hover:border-purple-600';
  };

  return (
    <div className="flex gap-3 mt-6 justify-center flex-wrap">
      {activeLinks.map((social, index) => {
        const Icon = getIcon(social.icon);
        return (
          <MotionA
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 ${getColor(social.platform)}`}
            aria-label={social.platform}
          >
            <Icon size={18} strokeWidth={2} />
          </MotionA>
        );
      })}
    </div>
  );
};

export default SocialLinks;