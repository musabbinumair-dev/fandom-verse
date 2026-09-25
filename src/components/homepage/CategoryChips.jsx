import { CATEGORIES } from "../../data/homepageData";
const CategoryChips = ({
  selectedCategory,
  onSelectCategory,
  className = ""
}) => {
  const allCategories = ["All", ...CATEGORIES];
  return <div
    className={`flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth select-none ${className}`}
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
      {allCategories.map((cat) => {
    const isActive = selectedCategory === cat;
    return <button
      key={cat}
      type="button"
      onClick={() => onSelectCategory(cat)}
      className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${isActive ? "bg-[#FF5F1F] text-white border-2 border-[#FF5F1F] scale-105" : "bg-white text-[#8A7B6C] border-2 border-[#F0E8DD] hover:border-[#FF5F1F]/60 hover:text-[#231C14] hover:scale-105 active:scale-95"}`}
    >
            {cat}
          </button>;
  })}
    </div>;
};
export {
  CategoryChips
};
