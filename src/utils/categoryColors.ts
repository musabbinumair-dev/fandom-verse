/**
 * Category color mappings for FandomVerse
 * 
 * Rules:
 * - Anime: Ripe Plum #5C1966 (solid chip background, white text)
 * - Gaming: Fanfare #01595A (solid chip, white text)
 * - Movies: Spearmint #06F284 (solid chip, black text)
 * - TV Shows: #021826 outline chip with Lima #9BFF6C border/text
 * - K-Pop: Hexos Palesun #EAF405 (solid chip, black text)
 * - Comics: Ripe Plum #5C1966 outline variant (border #5C1966, light plum text)
 * - Manga: Fanfare #01595A outline variant (border #01595A, light teal text)
 * - Cosplay: Lima #9BFF6C solid chip, black text
 */

export interface CategoryColorStyle {
  bg: string;
  text: string;
  border: string;
  accentBorder: string; // for sidebar left accent
  chipClass: string;
}

export function getCategoryStyle(category: string): CategoryColorStyle {
  const norm = category.toLowerCase().trim();

  if (norm.includes('anime')) {
    return {
      bg: '#5C1966',
      text: '#FFFFFF',
      border: '#5C1966',
      accentBorder: '#5C1966',
      chipClass: 'bg-[#5C1966] text-white border-[#5C1966]',
    };
  }

  if (norm.includes('gaming') || norm.includes('game')) {
    return {
      bg: '#01595A',
      text: '#FFFFFF',
      border: '#01595A',
      accentBorder: '#01595A',
      chipClass: 'bg-[#01595A] text-white border-[#01595A]',
    };
  }

  if (norm.includes('movie') || norm.includes('film')) {
    return {
      bg: '#06F284',
      text: '#021826',
      border: '#06F284',
      accentBorder: '#06F284',
      chipClass: 'bg-[#06F284] text-[#021826] font-semibold border-[#06F284]',
    };
  }

  if (norm.includes('tv') || norm.includes('television') || norm.includes('series') || norm.includes('show')) {
    return {
      bg: '#021826',
      text: '#9BFF6C',
      border: '#9BFF6C',
      accentBorder: '#9BFF6C',
      chipClass: 'bg-[#021826] text-[#9BFF6C] border-[#9BFF6C] font-semibold',
    };
  }

  if (norm.includes('k-pop') || norm.includes('kpop') || norm.includes('music') || norm.includes('album')) {
    return {
      bg: '#EAF405',
      text: '#021826',
      border: '#EAF405',
      accentBorder: '#EAF405',
      chipClass: 'bg-[#EAF405] text-[#021826] font-semibold border-[#EAF405]',
    };
  }

  if (norm.includes('comic') || norm.includes('superhero')) {
    return {
      bg: '#021826',
      text: '#E0A2EA',
      border: '#5C1966',
      accentBorder: '#5C1966',
      chipClass: 'bg-[#021826] text-[#E0A2EA] border-[#5C1966]',
    };
  }

  if (norm.includes('manga')) {
    return {
      bg: '#021826',
      text: '#42C5C7',
      border: '#01595A',
      accentBorder: '#01595A',
      chipClass: 'bg-[#021826] text-[#42C5C7] border-[#01595A]',
    };
  }

  if (norm.includes('cosplay')) {
    return {
      bg: '#9BFF6C',
      text: '#021826',
      border: '#9BFF6C',
      accentBorder: '#9BFF6C',
      chipClass: 'bg-[#9BFF6C] text-[#021826] font-semibold border-[#9BFF6C]',
    };
  }

  // Fallback for custom or combined categories (e.g. Lore / Sci-Fi)
  return {
    bg: '#0A2A33',
    text: '#7FA3A8',
    border: '#123847',
    accentBorder: '#06F284',
    chipClass: 'bg-[#0A2A33] text-[#7FA3A8] border-[#123847]',
  };
}
