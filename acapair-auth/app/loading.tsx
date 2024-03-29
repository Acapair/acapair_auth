const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#242731]">
      <div className="flex h-screen items-center justify-center space-x-2 dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default Loading;
