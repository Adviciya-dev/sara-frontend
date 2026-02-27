'use client';

const LoadingSpinner = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-sara-navy z-50"
      data-testid="loading-spinner"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-sara-border rounded-full animate-spin border-t-sara-cyan"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-sara-cyan/20 rounded-full animate-pulse"></div>
        </div>
        
        {/* Logo placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sara-cyan font-bold text-xl">S</span>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="absolute mt-24 text-muted-foreground">
        <div className="loading-dots flex gap-1">
          <span className="w-2 h-2 bg-sara-cyan rounded-full"></span>
          <span className="w-2 h-2 bg-sara-cyan rounded-full"></span>
          <span className="w-2 h-2 bg-sara-cyan rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
