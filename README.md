# Guardian Secure Session

A professional, production-ready communication portal designed to replace legacy SIP/VOIP systems. Guardian utilizes a modern **Selective Forwarding Unit (SFU)** architecture via LiveKit for ultra-low latency media, integrated with a **FastAPI Intelligence Layer** for secure identity management and mediated file sharing.

##  Key Features

- **Encrypted Media:** Ultra-low latency voice/video streams powered by LiveKit SFU.
- **Intelligence Feed:** Real-time data channels for secure messaging and system updates.
- **Mediated File Relay:** Secure file sharing through a FastAPI backend that acts as a security gatekeeper.
- **Full Containerization:** One-click deployment using Docker and Docker Compose.
- **Modern UI:** Built with Next.js 15, Tailwind CSS, and Lucide Icons for a premium experience.

##  Project Structure

```text
.
├── docker-compose.yml      # Unified stack orchestrator
├── livekit.yaml            # Media server configuration
├── backend/                # Intelligence Layer (Python/FastAPI)
│   ├── Dockerfile          # Backend containerization
│   ├── .env                # Security credentials
│   ├── uploads/            # Secure mediated file storage
│   └── app/                # Main logic & Token services
└── frontend/               # Next.js 15 Dashboard

1. Infrastructure Setup
In the root directory, run the following to build and start the Media Engine and Backend services:
docker compose up --build

2. Frontend Setup
In a separate terminal, navigate to the frontend/ directory and run:
npm install
npm run dev

3. Access the Portal
Open your browser and navigate to:
http://localhost:3000

4.Security Configuration

Ensure your backend/.env file is present and configured with the following development credentials to match the livekit.yaml:
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
LIVEKIT_URL=ws://livekit-server:7880

Technical Architecture

    Frontend: Next.js 15, Tailwind CSS, LiveKit React Components.

    Backend: FastAPI (Python 3.11), Uvicorn.

    Media Engine: LiveKit SFU (WebRTC).

    Orchestration: Docker Compose.
