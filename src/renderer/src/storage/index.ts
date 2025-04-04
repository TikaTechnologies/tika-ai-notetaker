import { IDBPDatabase, openDB } from 'idb'

const ObjectStore = {
  AppData: 'AppData',
  UserData: 'UserData',
  Settings: 'Settings',
  Notes: 'Notes'
} as const

export const AppDataStore = {
  RememberEmailOnLogin: 'remember-me-login'
}

type StoreName = keyof typeof ObjectStore
type AppDataKeys = keyof typeof AppDataStore

export type Note = any

class Storage {
  private dbPromise: Promise<IDBPDatabase>

  constructor() {
    this.dbPromise = this.initializeDb()
  }

  private async initializeDb() {
    return openDB('AppStorage', 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(ObjectStore.AppData)) {
          db.createObjectStore(ObjectStore.AppData, { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains(ObjectStore.UserData)) {
          db.createObjectStore(ObjectStore.UserData, { keyPath: 'id' })
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

  private async getAll(store: StoreName) {
    const db = await this.dbPromise
    return db.getAll(ObjectStore[store])
  }

  private async getById(store: StoreName, id: string) {
    const db = await this.dbPromise
    return db.get(ObjectStore[store], id)
  }

  private async set(store: StoreName, data: any) {
    const db = await this.dbPromise
    const tx = db.transaction(ObjectStore[store], 'readwrite')
    const storeRef = tx.store

    if (Array.isArray(data)) {
      for (const item of data) {
        await storeRef.put(item)
      }
    } else {
      await storeRef.put(data)
    }

    await tx.done
  }

  private async delete(store: StoreName, id: string) {
    const db = await this.dbPromise
    await db.delete(ObjectStore[store], id)
  }

  private async getAppData(key: AppDataKeys) {
    const item: { key: string; value: any } = await this.getById('AppData', key)
    return item?.value || { key, value: null }
  }

  private async updateAppData(key: string, value: any) {
    await this.set('AppData', { key, value })
  }

  private async createUserProfile(userEmail: string) {
    const userId = `${Math.random()}`
    const userData = { id: userId, email: userEmail }
    await this.set('UserData', userData)
    return userData
  }

  private async createNote(userId: string, title: string, content: string) {
    const noteId = `${Math.random()}`
    const note = { noteId, userId, title, content }
    await this.set('Notes', note)
    return note
  }

  private async updateUserProfile(userId: string, profile: Record<string, any>) {
    await this.set('UserData', { userId, profile })
  }

  private async updateUserSettings(userId: string, settings: Record<string, any>) {
    await this.set('Settings', { userId, settings })
  }

  private async saveNote(note: Note) {
    await this.set('Notes', note)
  }

  private async getUserProfile(userId: string) {
    return this.getById('UserData', userId)
  }

  private async getUserSettings(userId: string) {
    return this.getById('Settings', userId)
  }

  private async getNote(noteId: string) {
    return this.getById('Notes', noteId)
  }

  private async deleteNote(noteId: string) {
    return this.delete('Notes', noteId)
  }

  private async listNotes() {
    return this.getAll('Notes')
  }

  public AppData = {
    get: this.getAppData,
    set: this.updateAppData
  }

  public Users = {
    create: this.createUserProfile,
    update: this.updateUserProfile,
    get: this.getUserProfile
  }

  public Settings = {
    get: this.getUserSettings,
    set: this.updateUserSettings
  }

  public Notes = {
    get: this.getNote,
    getAll: this.listNotes,
    create: this.createNote,
    update: this.saveNote,
    delete: this.deleteNote
  }
}

const AppStorage = new Storage()
export default AppStorage
