const Index = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-6 animate-fade-up">
        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Site em Manutenção</h1>
        <p className="text-white/50 text-base md:text-lg max-w-md text-center">
          Estamos trabalhando para melhorar sua experiência. Voltaremos em breve.
        </p>
      </div>
    </div>
  );
};

export default Index;
