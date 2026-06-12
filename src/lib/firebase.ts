import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  getDocFromServer
} from "firebase/firestore";
import { Player, FullDashboardData } from "../types";

// Firebase configuration from environment variables
const env = (import.meta as any).env || {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// Check if variables are configured
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "dummy-project-id"
);

let app;
let db: any = null;
let auth: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Test connection as mandated by the Firebase skill
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn("Firebase test connection: Client is offline.");
        }
      }
    };
    testConnection();

    // Silently perform anonymous sign-in to guarantee database security rights
    signInAnonymously(auth).catch(err => {
      console.warn("Firebase Anonymous auth failed, rules matching might be affected:", err.message);
    });
  } catch (error) {
    console.error("Critical: Failed to initialize Firebase:", error);
  }
} else {
  console.log("Firebase config not fully loaded. Operating Vava Bronze in Local-First resilient mode.");
}

// Error codes handler mandated by the Firebase Integration skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || "Local mode / unauthorized",
      email: auth?.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Persists a Player profile and metadata to Firestore (or local-fallback state if unconfigured)
 */
export async function savePlayerToDatabase(player: Player) {
  const docId = `${player.gameName.toLowerCase()}_${player.tagLine.toLowerCase()}`.replace(/[^a-zA-Z0-9]/g, "_");
  const playerData = {
    ...player,
    savedAt: new Date().toISOString()
  };

  if (db) {
    try {
      await setDoc(doc(db, "players", docId), playerData);
      console.log(`Cloud Saved player card: ${player.gameName}#${player.tagLine}`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `players/${docId}`);
    }
  } else {
    // Local-storage fallback
    try {
      const stored = localStorage.getItem("vavabronze_players") || "[]";
      const players: Player[] = JSON.parse(stored);
      const filtered = players.filter(p => p.id !== player.id);
      filtered.unshift(playerData); // prepend recent search
      localStorage.setItem("vavabronze_players", JSON.stringify(filtered.slice(0, 10)));
    } catch (e) {
      console.error("Local storage caching failed:", e);
    }
  }
}

/**
 * Retrieves the recently queried / saved players list
 */
export async function getSavedPlayers(): Promise<Player[]> {
  if (db) {
    const playersPath = "players";
    try {
      const q = query(collection(db, playersPath), orderBy("savedAt", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const playersList: Player[] = [];
      querySnapshot.forEach((docSnap) => {
        playersList.push(docSnap.data() as Player);
      });
      return playersList;
    } catch (err) {
      // In case of any read failure (e.g. key permissions or offline), fall back directly to local list
      console.warn("Firestore fetch failed, retrieving local list fallback.");
      return getLocalSavedPlayers();
    }
  } else {
    return getLocalSavedPlayers();
  }
}

function getLocalSavedPlayers(): Player[] {
  try {
    const stored = localStorage.getItem("vavabronze_players") || "[]";
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

/**
 * Saves specific match history into Firestore subcollection
 */
export async function savePlayerMatchesToCloud(player: Player, matches: any[]) {
  if (!db) return;
  const playerDocId = `${player.gameName.toLowerCase()}_${player.tagLine.toLowerCase()}`.replace(/[^a-zA-Z0-9]/g, "_");
  
  try {
    // Save up to 5 matches securely
    const promises = matches.slice(0, 5).map(async (m) => {
      const matchDocId = m.matchId;
      await setDoc(doc(db, "players", playerDocId, "matches", matchDocId), m);
    });
    await Promise.all(promises);
  } catch (err) {
    console.warn("Subcollection write warning:", err);
  }
}

export { db, auth, isFirebaseConfigured };
