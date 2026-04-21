"use client";

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  Chat,
  useChat, // Needed to send the file link
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { Paperclip } from "lucide-react";

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
        <header className="p-5 flex justify-between items-center z-20 border-b border-slate-100 bg-white">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            Guardian Secure Session
          </h2>
        </header>

        <div className="flex-1 flex overflow-hidden relative bg-white">
          <main className="flex-1 relative p-6">
            <VideoLayout />
          </main>

          <aside className="w-80 flex flex-col h-full shrink-0 z-10 border-l border-slate-100 bg-white overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-slate-50">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Intelligence Feed
              </span>
              {/* --- New File Action Button --- */}
              <FileAttachmentButton />
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

function FileAttachmentButton() {
  const { send } = useChat();

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/upload-secure-file", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Security Blocked or Upload Failed");

        const data = await response.json();

        // Broadcast the secure link to the chat
        await send(`📁 Shared File: ${data.fileName} \nLink: ${data.url}`);

      } catch (err) {
        alert("Guardian Security: Upload rejected.");
      }
    };
    input.click();
  };

  return (
    <button
      onClick={handleUpload}
      className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-md transition-all active:scale-95"
      title="Attach Secure File"
    >
      <Paperclip size={16} />
    </button>
  );
}

function VideoLayout() {
  const tracks = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }], { onlySubscribed: false });
  return (
    <GridLayout tracks={tracks} className="h-full">
      <ParticipantTile className="rounded-2xl overflow-hidden border-4 border-slate-50 shadow-sm" />
    </GridLayout>
  );
}
