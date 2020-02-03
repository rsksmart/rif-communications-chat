export default class LocalStorage {

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage()
    }

    return LocalStorage.instance
  }
  private static instance: LocalStorage

  private constructor() { }
  public setItem(key: string, item: string | object): void {
    try {
      const value = typeof item === 'object' ? JSON.stringify(item) : item
      localStorage.setItem(key, value)
    } catch (e) {
      import('./Logger').then(logger => {
        logger.default.getInstance().error(e)
      })
    }
  }

  public getItem(key) {
    const value = localStorage.getItem(key) || ''
    let item
    try {
      item = JSON.parse(value)
    } catch { }
    return item || value
  }

  public clear(): void {
    localStorage.clear()
  }
}
