import { describe, it, expect } from "vitest";
import { isValidImage } from "../validateImage";

describe("isValidImage", () => {
  const createFile = (name: string, type: string) =>
    new File(["dummy"], name, { type });

  it("returns true for valid image mime type", () => {
    const file = createFile("random.file", "image/jpeg");
    expect(isValidImage(file)).toBe(true);
  });

  it("returns true for valid image extension", () => {
    const file = createFile("cat.png", "application/octet-stream");
    expect(isValidImage(file)).toBe(true);
  });

  it("is case insensitive for extension", () => {
    const file = createFile("CAT.JPG", "");
    expect(isValidImage(file)).toBe(true);
  });

  describe("invalid file types", () => {
    it("returns false for .docx file", () => {
      const file = createFile(
        "document.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      expect(isValidImage(file)).toBe(false);
    });

    it("returns false for .xlsx file", () => {
      const file = createFile(
        "spreadsheet.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      expect(isValidImage(file)).toBe(false);
    });

    it("returns false for .pdf file", () => {
      const file = createFile("file.pdf", "application/pdf");
      expect(isValidImage(file)).toBe(false);
    });

    it("returns false for file with no extension and no valid mime", () => {
      const file = createFile("file", "");
      expect(isValidImage(file)).toBe(false);
    });

    it("returns false for disguised extension (.jpg.exe)", () => {
      const file = createFile("cat.jpg.exe", "");
      expect(isValidImage(file)).toBe(false);
    });
  });
});