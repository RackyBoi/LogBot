class IgnorableError extends Error {
    constructor(message) {
      super(message);
      this.name = 'IgnorableError';
    }
}

module.exports = IgnorableError;