const LoadingScreen = () => {
  return (
    <div className="fixed min-h-[100dvh] inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-purple-200">
      <div className="text-center space-y-8">
        {/* Simple Crown */}
        <div className="text-6xl sm:text-7xl md:text-8xl">
          👑
        </div>
        
        {/* Loading Text and Spinner */}
        <div className="space-y-6">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: '#D4AF37',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Preparing the Castle...
          </h2>
          
          {/* Elegant Spinner */}
          <div className="flex justify-center">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-3 sm:border-4 md:border-5 border-pink-200 border-t-pink-600 rounded-full animate-spin"
              style={{
                borderTopColor: '#D4AF37',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
