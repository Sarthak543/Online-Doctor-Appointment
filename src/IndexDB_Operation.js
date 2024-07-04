// const DB_NAME = 'userData';
// const STORE_NAME = 'user';

export const openDatabase = (DB_NAME) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1); // Version 1

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db); // Resolve with the opened database
    };

    request.onerror = (event) => {
      reject(event.target.error); // Handle errors during opening
    };

    // Handle database upgrade scenario (optional)
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store1 = db.createObjectStore("Patient", { keyPath: 'eMail' });
      const store2 = db.createObjectStore("Doctor", { keyPath: 'email' });
    };
  });
};

export const addUserData = async (data, email, DB_NAME, STORE_NAME) => {
  const db = await openDatabase(DB_NAME);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(email); // Check if key exists
    request.onsuccess = (event) => {
      const existingData = event.target.result;
      if (!existingData) {
        // Key does not exist, proceed with adding data
        const addRequest = store.add(data);
        addRequest.onsuccess = () => {
          resolve(); // Successful addition
        };
        addRequest.onerror = (errorEvent) => {
          reject(errorEvent.target.error); // Handle errors
        };
      } else {
        // Key already exists, skip adding data
        resolve(); // No action needed
      }
    };
    request.onerror = (errorEvent) => {
      reject(errorEvent.target.error); // Handle errors
    };
  });
};


export const getUserData = async (email,DB_NAME,STORE_NAME) => {
  const db = await openDatabase(DB_NAME);
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(email); // Get data by email (key)
    request.onsuccess = (event) => {
      console.clear()
      console.log(event.target.result)
      console.log(email)
      console.log(request)
      console.log("//////////////////////////////////////////////////////////////////////////////")
      resolve(event.target.result); // Resolve with retrieved data
    };
    request.onerror = (event) => {
      reject(event.target.error); // Handle errors
    };
  });
};

export const deleteData = async(email,DB_NAME,STORE_NAME)=>{
  const db = await openDatabase(DB_NAME);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const request = store.delete(email);

  return new Promise((resolve, reject) => {
    // const request = store.get(email); // Get data by email (key)
    request.onsuccess = (event) => {
      resolve("Data deleted"); // Resolve with retrieved data
    };
    request.onerror = (event) => {
      reject(event.target.error); // Handle errors
    };
  });
};

