class CommandNotFound extends Error {
    constructor(message) {
      super(message);
      this.name = 'CommandNotFound';
    }
}

module.exports = CommandNotFound;