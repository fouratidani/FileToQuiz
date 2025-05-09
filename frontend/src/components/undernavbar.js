import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function UnderNavbar() {
  const [active, setActive] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  let isDragging = false;
  let startX, scrollLeft;

  const languages = [
    "HTML", "CSS", "JAVASCRIPT", "SQL", "PYTHON", "JAVA", "PHP", "HOW TO", "CSS",
    "C", "C++", "C#", "BOOTSTRAP", "REACT", "MYSQL", "JQUERY", "EXCEL", "XML",
    "DJANGO", "NUMPY", "PANDAS", "NODEJS", "DSA", "RUST", "GO", "KOTLIN", "TYPESCRIPT",
    "SWIFT", "PERL", "R", "SCALA", "FLUTTER", "DART", "RUBY", "SPRING", "ANGULAR",
    "VUE", "TAILWIND", "SASS", "LARAVEL", "GRAPHQL", "NEXT.JS", "EXPRESS", "FASTAPI",
    "MONGODB", "POSTGRESQL", "REDIS"
  ];

  // Check if scrolling is at the start or end
  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  // Function to scroll using buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Handle drag start
  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  // Handle dragging
  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Stop dragging
  const stopDrag = () => {
    isDragging = false;
  };

  useEffect(() => {
    const currentRef = scrollRef.current; // Store in a variable
  
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check
    }
  
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);
  

  return (
    <div className="bg-gray-900 text-white flex items-center p-2 relative">
      {/* Left Arrow (Only Show If Can Scroll Left) */}
      {canScrollLeft && (
        <button onClick={() => scroll("left")} className="absolute left-0 bg-transparent p-2 rounded-full">
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap mx-8 cursor-pointer select-none"
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={onDrag}
        onTouchEnd={stopDrag}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {languages.map((lang, index) => (
          <button
            key={index}
            onClick={() => setActive(lang)}
            className={`px-3 py-1 rounded transition duration-300 
              ${active === lang ? "bg-green-500 text-white" : "hover:bg-green-300"}`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Right Arrow (Only Show If Can Scroll Right) */}
      {canScrollRight && (
        <button onClick={() => scroll("right")} className="absolute right-0 bg-transparent p-2 rounded-full">
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default UnderNavbar;
