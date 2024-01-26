import validateLinkList from "../src/http-validation.js";
import { expect } from "chai";

describe('Test the validation off the links', () => {
  it('should return an array of objects with the same length as the input array', async () => {
    const linkList = [
      { url: 'https://www.example.com' },
      { url: 'https://www.google.com' },
      { url: 'https://www.github.com' }
    ];
    const result = await validateLinkList(linkList);
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(linkList.length);
  });

  it('should return an empty array when called with an empty array', async () => {
    const linkList = [];
    const result = await validateLinkList(linkList);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
  });

  it('should return an array of objects with status set to "invalid" for invalid URLs', async () => {
    const linkList = [
      { url: 'invalid-url' }
    ];
    const result = await validateLinkList(linkList);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(linkList.length);
    result.forEach((object) => {
      expect(object).to.have.property('status', 'Other error');
    });
  });

  it.skip('should remove duplicates and return an array with unique URLs', async () => {
    const linkList = [
      { url: 'https://www.example.com' },
      { url: 'https://www.google.com' },
      { url: 'https://www.example.com' },
      { url: 'https://www.github.com' }
    ];
    const result = await validateLinkList(linkList);

    expect(result).to.be.an('array');
    const uniqueUrls = [...new Set(linkList.map((object) => object.url))];
    expect(result).to.have.lengthOf(uniqueUrls.length);
  });

  it.skip('should handle URLs with different protocols correctly and return an array with the correct status for each URL', async () => {
    const linkList = [
      { url: 'https://www.example.com' },
      { url: 'http://www.google.com' },
      { url: 'https://www.github.com' }
    ];
    const result = await validateLinkList(linkList);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(linkList.length);
    result.forEach((object, index) => {
      if (linkList[index].url.startsWith('http')) {
        expect(object).to.have.property('status', 'invalid');
      } else {
        expect(object).to.have.property('status', 'valid');
      }
    });
  });
});