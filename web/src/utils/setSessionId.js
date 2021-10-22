//Set global headers for all axios objects
const setSessionId = sessionId => {
  if (sessionId) {
    localStorage.setItem("sessionId", sessionId);
  } else {
    localStorage.removeItem("sessionId");
  }
};

export default setSessionId;
