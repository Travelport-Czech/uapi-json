const ce = require('node-custom-errors');

const BaseError = ce.create({
  construct(message, data) {
    this.message = `${message || this.message} ${data ? JSON.stringify(data, null, 2) : ''}`;
  },
});

module.exports = BaseError;
