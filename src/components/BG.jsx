export function BackgroundPattern({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* The Pattern Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239ca3af' fill-rule='evenodd'%3E%3Cpath d='M0 0h20v20H0zm20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}