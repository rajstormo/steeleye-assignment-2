const highlightHTMLContent = require('./highlightContent');
const testCases = require("./testCases")

testCases.forEach((testCase) => {
  test('checks if html content is highlighted correctly', () => {
    expect(highlightHTMLContent(testCase.htmlContent, testCase.plainText, testCase.plainTextPositions)).toBe(testCase.expectedResult);
  });
});