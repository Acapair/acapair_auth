import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p>Canlı yayın aktif değil.</p>;
  } else if (!participant || tracks.length === 0) {
    content = <p>Yayın yükleniyor...</p>;
  } else {
    content = <video autoPlay playsInline muted ref={participant.videoRef} />;
  }

  return <div className="group relative aspect-video border-b">{content}</div>;
};

export default Video;
