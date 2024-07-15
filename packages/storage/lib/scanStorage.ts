import { BaseStorage, createStorage, StorageType } from "./base";

export interface Results {
  line: number;
  match: string;
  script: string; // url
}

export interface Scan {
  databases: {
    name: string;
    results: Results[];
  }[];
  databaseLogins: {
    name: string;
    results: Results[];
  }[];
  obfuscations: {
    name: string;
    results: Results[];
  }[];
  secrets: {
    name: string;
    results: Results[];
  }[];
}

type ScanStorage = BaseStorage<Scan[]> & {
  getScans: () => Promise<Scan[]>;
  getScan: (id: number) => Promise<Scan>;

  addScan: (scan: Scan) => Promise<void>;
};

const storage = createStorage<Scan[]>("user-storage-key", [], {
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
