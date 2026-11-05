import { TeamMemberCard } from "@/components/TeamCardStudio";

const DB_NAME = "PaceTeamDB";
const STORE_NAME = "rosterStore";
const ROSTER_KEY = "pace_dml_roster_v5";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Loads the saved roster from IndexedDB (primary) or localStorage (fallback).
 */
export async function loadTeamRoster(): Promise<TeamMemberCard[] | null> {
  if (typeof window === "undefined") return null;

  // 1. Try IndexedDB
  try {
    const db = await openDB();
    const result = await new Promise<TeamMemberCard[] | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(ROSTER_KEY);
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });

    if (result) return result;
  } catch {
    // IndexedDB failed or unavailable, proceed to localStorage
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem(ROSTER_KEY) || localStorage.getItem("pace_dml_roster_v4");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // localStorage unavailable
  }

  return null;
}

/**
 * Saves the roster to both IndexedDB (no 5MB limit) and localStorage (fast synchronous cache).
 */
export async function persistTeamRoster(members: TeamMemberCard[]): Promise<boolean> {
  if (typeof window === "undefined") return false;

  let savedIndexedDB = false;

  // 1. Save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(members, ROSTER_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    savedIndexedDB = true;
  } catch (err) {
    console.warn("IndexedDB save failed:", err);
  }

  // 2. Save to localStorage with clean quota handling
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(members));
  } catch (err) {
    console.warn("LocalStorage quota reached (safe because IndexedDB saved):", err);
  }

  return savedIndexedDB;
}

/**
 * High-efficiency image compressor:
 * Resizes to 360x360px JPEG (quality 0.82) so images are ultra-crisp for Retina avatar displays
 * while weighing only ~25-35KB (preventing browser quota issues).
 */
export function compressImageForCard(
  file: File,
  maxWidth = 360,
  maxHeight = 360,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
