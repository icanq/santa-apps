const santaService = require("../services/santa.service");
const users = require("../data/users");
const userProfiles = require("../data/user-profiles");

describe("SantaService", () => {
  beforeEach(() => {
    santaService.requests = [];
    santaService.users = users;
    santaService.userProfiles = userProfiles;
  });

  describe("validateRequest", () => {
    // valid request
    test("should validate a valid request", async () => {
      const res = await santaService.validateRequest(
        "charlie.brown",
        "Hi Santa, I want some cookies!"
      );
      expect(res.isValid).toBe(true);
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("user");
      expect(res).toHaveProperty("profile");
    });

    // not valid request
    test("should invalidate a request with no name given", async () => {
      const res = await santaService.validateRequest(
        null,
        "Hi Santa, I want some cookies!"
      );
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Please provide name");
    });

    test("should invalidate a request with long message", async () => {
      const res = await santaService.validateRequest(
        "charlie.brown",
        "Hi Santa, I think i want some candy but i don't think my mom will allow me to eat some candy since candy are really ad for my teeth, how about i request for some chocolate, but i think it's the same? so i guess i want Maseratti!"
      );
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("Message is too long");
    });

    test("should invalidate a request with a non-registered children ", async () => {
      const res = await santaService.validateRequest(
        "icanq",
        "Hi Santa, I want Gundam!"
      );
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Child is not registered");
    });

    test("should invalidate a request with a children with no profile", async () => {
      santaService.users.push({
        username: "ichsan.natawijaya",
        uid: "8658-2192912-12asdas-1218218",
      });
      const res = await santaService.validateRequest(
        "ichsan.natawijaya",
        "Hello santa, santa hello"
      );

      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Child profile not found");
    });

    test("should invalidate a request with child is 10 years or older", async () => {
      const res = await santaService.validateRequest(
        "james.bond",
        "Hello santa, do you know what i want?"
      );
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Child is 10 years old or older");
    });
  });

  describe("addRequest", () => {
    // validate a valid request
    test("should validate a valid request", async () => {
      const res = await santaService.addRequest(
        "charlie.brown",
        "Hello Santa, Im Charlie not Emmet, I want some Ice cream!"
      );
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("id");
      expect(res).toHaveProperty("message");
      expect(res.isValid).toBe(true);
      expect(res.message).toContain('Request received successfully')
      
    });

    // invalidate invalid request
    test("should not add invalid request", async () => {
      const res = await santaService.addRequest()
      
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('Please provide name');
    });
    
    test("should not add invalid request 2", async () => {
      const res = await santaService.addRequest(
        "froggy",
        "croakcroakcroak"
      )
      
      expect(res).toHaveProperty("isValid");
      expect(res).toHaveProperty("error");
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('Child is not registered');
    });
  });
  
  describe("getPendingRequests", () => {
    test('should return all pending requests | empty', async () => {
      const pendingReq = await santaService.getPendingRequests();
      expect(pendingReq.length).toBe(0)
    })
    
    test('should return all pending requests | 2 req', async () => {
      await santaService.addRequest('charlie.brown', 'I want brownies')
      await santaService.addRequest('bugs.bunny', 'I want a carrot!')
      const pendingReq = await santaService.getPendingRequests();
      expect(pendingReq.length).toBe(2)
    })
    
    test('should return all pending requests | 2 req success; 1 fail', async () => {
      await santaService.addRequest('charlie.brown', 'I want brownies')
      await santaService.addRequest('bugs.bunny', 'I want a carrot!')
      await santaService.addRequest('icanq', 'I want Dune books!')
      const pendingReq = await santaService.getPendingRequests();
      expect(pendingReq.length).toBe(2)
    })
  })
  
  describe("clearRequests", () => {
    test('should clear all requests', async () => {
      await santaService.addRequest('charlie.brown', 'I want brownies')
      await santaService.addRequest('bugs.bunny', 'I want a carrot!')
      
      santaService.clearRequests()
      const pendingReq = await santaService.getPendingRequests();
      expect(pendingReq.length).toBe(0)
    })
  })
});
