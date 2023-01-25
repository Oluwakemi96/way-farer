import config from "../../../src/config";
import { expect } from "chai";
import * as Helpers from '../../../src/lib/utils/lib.util.helpers'
import * as Hash from '../../../src/lib/utils/lib.util.hash'
import {
  rightHash,
  wrongHash,
  wrongText,
  payload,
} from "../../fixtures/helpers";

describe("Basic Utility Functions", () => {
  let token;

  it("should generate a string token of with plenty characters", () => {
    token = Helpers.generateJWT({ payload }, "1d");
    expect(token).to.be.a("string").of.length.greaterThan(29);
  });

  it("should generate a string of 20 random characters", () => {
    let gtoken = Hash.generateRandomString(10);
    expect(gtoken).to.be.a("string").of.length(20);
  });

  it("should return decoded payload", () => {
    const payloadGotten = Helpers.verifyToken(
      token,
      config.WAYFARER_JWT_SECRET_KEY
    );
    expect(payloadGotten.payload).to.be.a("string").and.equal(payload);
  });

  it("should return true  when a string is compared with the right hash value", async () => {
    const isTrue = await Hash.comparePasswordHash(wrongText, rightHash);
    expect(isTrue).to.deep.eql(true);
  });

  it("should return false when a string is compared with the wrong hash value", async () => {
    const isTrue = await Hash.comparePasswordHash(wrongText, wrongHash);
    expect(isTrue).to.deep.eql(false);
  });

  it("should return the right amount of pages and limit", () => {
    const page = Helpers.calculatePages(8, 2);
    expect(page).to.equal(4);
  });

  it("should return datetime value", () => {
    const expiresIn = Helpers.setTokenExpire(2);
    expect(expiresIn).to.be.a("Date");
  });
});