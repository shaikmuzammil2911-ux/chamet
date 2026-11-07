import { SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playrooms & Games | Audio Party Rooms & Casual Gaming",
  description:
    "Interactive multi-seat audio lounges, casual multiplayer mini-games, and themed voice party rooms powered by ManaVerse Chamet.",
};

export default function PlayroomsGamesPage() {
  const service = SERVICES.find((s) => s.slug === "playrooms-games")!;
  return <ServiceDetailView service={service} />;
}

