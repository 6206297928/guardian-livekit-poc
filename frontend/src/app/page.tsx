"use client";

import { useState } from 'react';
// Correct relative import based on your tree: src/app/page.tsx -> src/components/LiveKitRoom.tsx
import GuardianRoom from '../components/LiveKitRoom';
import { Shield, User, Video, ArrowRight, Lock } from 'lucide-react';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function join(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`http://localhost:8000/get-token?room=${formData.get('room')}&user=${formData.get('user')}`);
      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      alert("Error: Ensure your FastAPI Backend is running!");
    } finally {
      setLoading(false);
    }
  }

  if (token) return <GuardianRoom token={token} />;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <form onSubmit={join} className="p-12">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
              <Shield size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight mb-2">Guardian</h1>
          <p className="text-slate-500 text-center mb-10 font-medium">Secure Communication Portal</p>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Room Access</label>
              <div className="relative group">
                <Video className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input name="room" defaultValue="guardian-test" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Identity</label>
              <div className="relative group">
                <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input name="user" defaultValue="sukumar" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-900 font-medium" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mt-6 active:scale-[0.98]">
              {loading ? "Connecting..." : "Enter Workspace"}
              <ArrowRight size={22} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 pt-8">
            <Lock size={14} className="text-slate-300" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </form>
      </div>
    </main>
  );
}
