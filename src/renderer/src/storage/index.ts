import { IDBPDatabase, openDB } from 'idb'

const ObjectStore = {
  AppData: 'AppData',
  Settings: 'Settings',
  Notes: 'Notes'
} as const

type StoreName = keyof typeof ObjectStore

class Storage {
  private dbPromise: Promise<IDBPDatabase>

  constructor() {
    this.dbPromise = this.initializeDb()
  }

  private async initializeDb() {
    return openDB('AppStorage', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(ObjectStore.AppData)) {
          db.createObjectStore(ObjectStore.AppData, { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains(ObjectStore.Settings)) {
          db.createObjectStore(ObjectStore.Settings, { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains(ObjectStore.Notes)) {
          db.createObjectStore(ObjectStore.Notes, { keyPath: 'id' })
        }
      }
    })
  }

  public async getAll(store: StoreName) {
    const db = await this.dbPromise
    return db.getAll(store)
  }

  public async getById(store: StoreName, id: string) {
    const db = await this.dbPromise
    return db.get(store, id)
  }

  public async set(store: StoreName, data: any) {
    const db = await this.dbPromise
    const tx = db.transaction(store, 'readwrite')
    if (Array.isArray(data)) {
      for (const item of data) {
        tx.store.put(item)
      }
    } else {
      tx.store.put(data)
    }
    return tx.done
  }

  public async updateAppData(key: string, value: any) {
    const db = await this.dbPromise
    const transaction = db.transaction(ObjectStore.AppData, 'readwrite')
    const store = transaction.objectStore(ObjectStore.AppData)

    store.put({ key, value })

    await transaction.done
  }

  public async updateSettings(key: string, value: any) {
    const db = await this.dbPromise
    const transaction = db.transaction(ObjectStore.Settings, 'readwrite')
    const store = transaction.objectStore(ObjectStore.Settings)

    store.put({ key, value })

    await transaction.done
  }

  public async delete(store: StoreName, id: string) {
    const db = await this.dbPromise
    return db.delete(store, id)
  }
}

const AppStorage = new Storage()

export default AppStorage
