import { STORAGE_KEYS } from "@constants/storage";

class MemoryStorage {
  storage: Record<string, any>;
  constructor() {
    this.storage = {};
  }

  setValue(key: string, value: any) {
    this.storage[key] = value;
  }

  getValue(key: string) {
    return this.storage[key];
  }

  getAuthenticationInfo() {
    return this.storage[STORAGE_KEYS.AUTHENTICATION];
  }

  setAuthenticationInfo(data: any) {
    if (data?.user) {
      this.storage[STORAGE_KEYS.AUTHENTICATION] = data?.user;
    }
  }

  clearAuthenticationInfo() {
    delete this.storage[STORAGE_KEYS.AUTHENTICATION];
  }
}

export default new MemoryStorage();
