// localStorageUtils.ts

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      localStorage.setItem("state", serializedState);
    }
  } catch (err) {
    console.error("Error saving state to local storage:", err);
    // Handle errors here
  }
};
