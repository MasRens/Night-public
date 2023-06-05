const Canvas = require('canvas')
const staticFolder = 'media/fonts'
Canvas.registerFont(`${staticFolder}/qetonyflores.ttf`, { family: 'default' })
Canvas.registerFont(`${staticFolder}/ArchitectsDaughter.ttf`, { family: 'arch' })
Canvas.registerFont(`${staticFolder}/SmallMemory.ttf`, { family: 'sm' })

// abstract class
class BaseGenerator {

  constructor(w, h) {
    // base canvas
    this._canvas = Canvas.createCanvas(w, h);

    /**
     * @type {Buffer[]} Buffer
     */
    this.buffers = [];

    // paper image path
    this._imagePath = null;
  }

  async loadImage() {
    const canvas = this._canvas;
    const ctx = canvas.getContext('2d');
    const img = await Canvas.loadImage(this.image);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, canvas.width, canvas.height);
  }

  set image(val) {
    if (val.startsWith('.')) { // relative path
      this._imagePath = val;
    } else if (val.match(/^(\/|[a-zA-Z]:)/)) { // absolute path
      this._imagePath = val;
    } else { // default path
      this._imagePath = `media/image/${val}.jpg`;
    }
  }

  get image() {
    return this._imagePath;
  }

  /**
   * Convert text to array that limited to n pixel
   * @param {String} text text to convert to list row text
   * @param {Number} maxTextWidth maximum text width in pixel
   * @returns {String[]}
   */
  toRowText(text, maxTextWidth) {
    let textPointer = 0;
    let charLen = 40;
    const strList = [];
    let enough = false;

    // split and limit text to row length which is maxTextWidth pixel
    while (textPointer <= text.length) {
      const ctx = this._canvas.getContext('2d');
      ctx.font = `${this.fontSize} ${this.fontFamily}`;
      const subText = text.substring(textPointer, textPointer + charLen);
      const measurement = ctx.measureText(subText);
      if (measurement.width < maxTextWidth && textPointer + charLen <= text.length && !enough) {
        const nextSpace = text.indexOf(' ', textPointer + charLen + 1);
        const relativeToCharLen = nextSpace - textPointer - charLen + 1; // add 1 so the space is in the end of text instead of start
        if (nextSpace === -1) {
          charLen += 2;
          continue;
        } else if (ctx.measureText(text.substring(textPointer, textPointer + charLen + relativeToCharLen)).width > maxTextWidth) {
          enough = true;
          continue;
        }
        charLen += relativeToCharLen;
        continue;
      }
      strList.push(subText);
      textPointer += charLen;
      charLen = 40;
      enough = false;
    }
    const splittedNewLine = [];
    for (const str of strList) {
      splittedNewLine.push(...str.split('\n'));
    }
    return splittedNewLine;
  }

}

module.exports = BaseGenerator;
