import { Rocket, Server, Layout, Search, Code, CheckCircle, Terminal, Cpu, Bot, type LucideIcon } from "lucide-react";

export type ServiceId = "mvp" | "backend" | "frontend";
export type ProcessId = "discovery" | "development" | "delivery";
export type BackgroundId = "linux" | "bots" | "hardware";

export interface ServiceData {
  id: ServiceId;
  icon: LucideIcon;
}

export interface ProcessData {
  id: ProcessId;
  icon: LucideIcon;
}

export interface BackgroundData {
  id: BackgroundId;
  icon: LucideIcon;
}

/**
 * Service offerings. The textual content (title, description)
 * is handled by the i18n dictionaries, mapped via the 'id'.
 */
export const SERVICES_DATA: ServiceData[] = [
  { id: "mvp", icon: Rocket },
  { id: "backend", icon: Server },
  { id: "frontend", icon: Layout },
];

/**
 * Workflow process steps. Textual content is handled via i18n.
 */
export const PROCESS_DATA: ProcessData[] = [
  { id: "discovery", icon: Search },
  { id: "development", icon: Code },
  { id: "delivery", icon: CheckCircle },
];

/**
 * Non-web engineering background to showcase deeper technical skills.
 */
export const BACKGROUND_DATA: BackgroundData[] = [
  { id: "linux", icon: Terminal },
  { id: "bots", icon: Bot },
  { id: "hardware", icon: Cpu },
];

