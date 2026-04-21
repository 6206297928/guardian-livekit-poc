"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  Chat,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";

export default function GuardianRoom({ token }: { token: string }) {
  return (
    <div className="h-screen w-full bg-white flex flex-col font-sans overflow-hidden">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl="ws://localhost:7880"
        data-lk-theme="default"
        className="flex-1 flex flex-col"
      >
        {/* Simple Header - Removed tags */}
        <header className="p-5 flex justify-between items-center z-20 border-b border-slate-100 bg-white">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Guardian Secure Session
          </h2>
        </header>

        {/* Layout Container */}
        <div className="flex-1 flex overflow-hidden relative bg-white">
          <main className="flex-1 relative p-6">
            <VideoLayout />
          </main>

          {/* Secure Sidebar */}
          <aside className="w-80 flex flex-col h-full shrink-0 z-10 border-l border-slate-100 bg-white overflow-hidden">
            <div className="p-4 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Intelligence Feed
            </div>
            <div className="flex-1 min-h-0 flex flex-col pb-2 overflow-hidden">
              <Chat />
            </div>
          </aside>
        </div>

        <RoomAudioRenderer />

        <div className="p-6 bg-white border-t border-slate-100 z-20">
           <ControlBar variation="minimal" />
        </div>
      </LiveKitRoom>
    </div>
  );
}

function VideoLayout() {
  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} className="h-full">
      <ParticipantTile className="rounded-2xl overflow-hidden border-4 border-slate-50 shadow-sm transition-all" />
    </GridLayout>
  );
}
