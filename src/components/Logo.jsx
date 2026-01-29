export function Logo({ className = "w-10 h-10" }) {
  return (
    // <svg 
    //   viewBox="0 0 200 150" 
    //   className={className}
    //   fill="none" 
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   {/* Pig snout shape - Purple background */}
    //   <ellipse 
    //     cx="100" 
    //     cy="75" 
    //     rx="100" 
    //     ry="80" 
    //     fill="#8B5CF6"  /* Tailwind purple-500 */
    //     stroke="#6D28D9" /* Tailwind purple-700 */
    //     strokeWidth="4" 
    //   />
      
    //   {/* Single large link icon spanning the center - Black */}
    //   <g stroke="white" strokeWidth="6" strokeLinecap="round">
    //     {/* Middle connecting line */}
    //     <path d="M 75 75 L 125 75" />
        
    //     {/* Left ring link */}
    //     <path d="M 95 60 H 65 A 15 15 0 0 0 65 90 H 95" />
        
    //     {/* Right ring link */}
    //     <path d="M 105 90 H 135 A 15 15 0 0 0 135 60 H 105" />
    //   </g>
    // </svg>
    <svg width="80" height="60" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="75" rx="80" ry="50" fill="#9333ea" stroke-width="5" />
  
  <ellipse cx="70" cy="75" rx="15" ry="22" fill="#6b21a8" />
  <ellipse cx="130" cy="75" rx="15" ry="22" fill="#6b21a8" />
</svg>
  );
}