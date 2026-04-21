"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  Chat,
  ChatToggle, // New: Allows opening/closing the chat
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { MessageSquare, ShieldCheck } from "lucide-react";

export default function GuardianRoom({ token }: { token: string }) {
  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans overflow-hidden">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl="ws://localhost:7880" // Note: For Vercel demo, you'll eventually use a Cloud URL
        data-lk-theme="default"
        className="flex-1 flex flex-col"
      >
        {/* Header Section */}
        <header className="p-4 bg-white border-b border-slate-200 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <h2 className="font-bold text-slate-800 tracking-tight">Guardian Secure Session</h2>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Secure Link</span>
            </div>
          </div>
        </header>

        {/* Main Interface: Video & Chat Sidebar */}
        <div className="flex-1 flex overflow-hidden relative bg-slate-100">
          <main className="flex-1 relative p-4">
            <VideoLayout />
          </main>

          {/* Lucrative Sidebar for Chat */}
          <aside className="w-85 bg-white border-l border-slate-200 flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2 text-slate-800 font-semibold">
              <MessageSquare size={18} className="text-blue-600" />
              Secure Intelligence Feed
            </div>
            <Chat />
          </aside>
        </div>

        <RoomAudioRenderer />

        {/* Control Bar with extra styling */}
        <div className="p-4 bg-white border-t border-slate-200 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
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
      <ParticipantTile className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-all hover:scale-[1.01]" />
    </GridLayout>
  );
}
