"use client";
interface StreamPlayerProps {
  user: any;
  stream: any;
}

const StreamPlayer = ({ user, stream }: StreamPlayerProps) => {
  return (
    <div className="text-white">
      <div>
        <div>Stream</div>
      </div>
    </div>
  );
};

export default StreamPlayer;
