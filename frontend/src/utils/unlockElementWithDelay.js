export default (setFunction, delay) => (bool) => setTimeout(() => setFunction(bool), delay);
