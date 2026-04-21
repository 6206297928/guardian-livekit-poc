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
        {/* Header Section - Icons and badges removed */}
        <header className="p-5 bg-white border-b border-slate-100 flex justify-between items-center z-10">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Guardian Secure Session
          </h2>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Identity Verified
          </div>
        </header>

        {/* Main Interface */}
        <div className="flex-1 flex overflow-hidden relative bg-slate-50">
          <main className="flex-1 relative p-6">
            <VideoLayout />
          </main>

          {/* Chat Sidebar - Fixed cropping and removed header icon */}
          <aside className="w-80 bg-white border-l border-slate-100 flex flex-col h-full">
            <div className="p-4 border-b border-slate-50 text-slate-600 text-sm font-bold uppercase tracking-tight">
              Secure Intelligence Feed
            </div>
            {/* The wrapper below ensures the Chat component fills the space without cropping */}
            <div className="flex-1 overflow-y-auto">
              <Chat />
            </div>
          </aside>
        </div>

        <RoomAudioRenderer />

        {/* Control Bar */}
        <div className="p-6 bg-white border-t border-slate-100 z-10">
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
      <ParticipantTile className="rounded-2xl overflow-hidden border-4 border-white shadow-xl transition-all" />
    </GridLayout>
  );
}
