const users = require('../data/users');
const userProfiles = require('../data/user-profiles');
const { v4: uuidv4 } = require('uuid');

const MAX_MESSAGE_LENGTH = 100;

class SantaService {
  constructor() {
    this.requests = [];
  }
  async validateRequest(name, message) {
    if (!name) return { isValid: false, error: 'Please provide name' };
    if (message.length > MAX_MESSAGE_LENGTH) {
      return {
        isValid: false,
        error: `Message is too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.`,
      };
    }

    const user = users.find(
      (u) => u.username.toLowerCase() === name.toLowerCase()
    );
    if (!user) {
      return { isValid: false, error: 'Child is not registered' };
    }

    const profile = userProfiles.find((p) => p.userUid === user.uid);
    if (!profile) {
      return { isValid: false, error: 'Child profile not found' };
    }

    const birthDate = new Date(profile.birthdate);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    if (age >= 10) {
      return { isValid: false, error: 'Child is 10 years old or older' };
    }

    return { isValid: true, user, profile };
  }

  async addRequest(name, message) {
    const validation = await this.validateRequest(name, message);
    if (!validation.isValid) {
      return validation;
    }

    const id = uuidv4();
    const request = {
      id,
      username: validation.user.username,
      address: validation.profile.address,
      message,
    };

    this.requests.push(request);
    return { isValid: true, id, message: 'Request received successfully' };
  }

  async getPendingRequests() {
    return this.requests;
  }

  clearRequests() {
    this.requests = [];
  }
}

module.exports = new SantaService();
