import { BaseStorage, createStorage, StorageType } from "./base";

export interface Matches {
  line: number;
  match: string;
  source: string; // url
}

export interface Scan {
  databases: {
    name: string;
    matches: Matches[];
  }[];
  databaseLogins: {
    name: string;
    matches: Matches[];
  }[];
  obfuscations: {
    name: string;
    matches: Matches[];
  }[];
  secrets: {
    name: string;
    matches: Matches[];
  }[];
}

type ScanStorage = BaseStorage<Scan[]> & {
  getScans: () => Promise<Scan[]>;
  getScan: (id: number) => Promise<Scan>;

  addScan: (scan: Scan) => Promise<void>;
};

const storage = createStorage<Scan[]>("scan-storage-key", [], {
  storageType: StorageType.Session,
  liveUpdate: true,
});

export const scanStorage: ScanStorage = {
  ...storage,

  getScans: async () => {
    const scans = await storage.get();
    return scans;
  },

  getScan: async (id: number) => {
    const scans = await storage.get();
    return scans[id];
  },

  addScan: async (scan: Scan) => {
    // for dev: await storage.set((scans) => [...scans, scan]);
    await storage.set([scan]);
  },
};
