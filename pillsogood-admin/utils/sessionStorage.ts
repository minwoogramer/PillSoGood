class SessionStorage {
    constructor() {}
  
    static setItem(key:string, item:any) {
      // window의 선언 여부 확인
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, item);
      }
    }
  
    static getItem(key:string) {
      if (typeof window !== "undefined") {
        return sessionStorage.getItem(key);
      }
      return null;
    }
  
    static removeItem(key:string) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
      }
    }
  }
  
  export default SessionStorage;