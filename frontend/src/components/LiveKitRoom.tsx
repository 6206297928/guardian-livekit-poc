"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";

export default function GuardianRoom({ token }: { token: string }) {
  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl="ws://localhost:7880"
        data-lk-theme="default"
        className="flex-1 flex flex-col"
      >
        <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm">
          <h2 className="font-bold text-slate-800">Guardian Secure Session</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Live</span>
          </div>
        </header>

        <main className="flex-1 relative bg-slate-100 p-4">
          <VideoLayout />
        </main>

        <RoomAudioRenderer />

        <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           <ControlBar variation="minimal" />
        </div>
      </LiveKitRoom>
    </div>
  );
}

function VideoLayout() {
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], { onlySubscribed: false });
  return (
    <GridLayout tracks={tracks} className="h-full">
      <ParticipantTile className="rounded-2xl overflow-hidden border-4 border-white shadow-xl" />
    </GridLayout>
  );
}
