function readLocalStorage<T>(key: string, parse: (value: string) => T) {
    const value = localStorage.getItem(key);
    if(!value) return undefined;
    return parse(value);
}

function writeLocalStorage<T>(key: string, value: T, stringify: (value: T) => string = String) {
    localStorage.setItem(key, stringify(value));
}

function removeLocalStorage(key: string) {
    localStorage.removeItem(key);
}

export { readLocalStorage, writeLocalStorage, removeLocalStorage }