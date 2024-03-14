const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-900">
      <div className="flex space-x-2 justify-center items-center h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
