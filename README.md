# gify-parse
A Node.JS module for parsing information on (animated) GIF files.

## Notes
**gify-parse** is a fork of [gify](https://github.com/rfrench/gify) by [rfrench](https://github.com/rfrench/) that is intended to encapsulate the logic into a Node.JS module and to provide a command-line interface.

## Installation

  Install with the Node.JS package manager [npm](http://npmjs.org/):

    $ npm install gify-parse

or

  Install via git clone:

    $ git clone git://github.com/jonashavers/node-gify-parse.git
    $ cd node-gify-parse
    $ npm install
      
## Usage

  Usage inside your Node.JS modules:

    var fs = require('fs');
    var gifyParse = require('gify-parse');
    
    var buffer = fs.readFileSync('test.gif');
    var gifInfo = gifyParse.getInfo(buffer);
    
    console.log(gifInfo);
    
  Usage of the CLI (command-line interface):
  
    $ gifyParse <file> [option]
    
    e.g.
    
    $ gifyParse test.gif
    $ gifyParse test.gif -p duration
    $ gifyParse test.gif -p images.0.delay
  
The examples above parse the file test.gif and print out the GIF file's information on the console. 

## Requirements
**gify-parse** requires
* [jDataView](https://github.com/vjeux/jDataView) for reading binary files,
* [commander.js](https://github.com/visionmedia/commander.js/) for the CLI.

## Methods
* **isAnimated**(sourceArrayBuffer) (bool)
* **getInfo**(sourceArrayBuffer) (gifInfo)

## info Properties
* **valid** (bool) - Determines if the GIF is valid.
* **animated** (bool) - Determines if the GIF is animated.
* **globalPalette** (bool) - Determines if the GIF has a global color palette.
* **globalPaletteSize** (int) - Size of the global color palette.
* **height** (int) - Canvas height.
* **width** (int) - Canvas width.
* **loopCount** (int) - Total number of times the GIF will loop. 0 represents infitine.
* **images** ([images]) - Array of images contained in the GIF.
* **isBrowserDuration** (bool) - If any of the delay times are lower than the [minimum value](http://nullsleep.tumblr.com/post/16524517190/animated-gif-minimum-frame-delay-browser-compatibility), this value will be set to true.
* **duration** (int) - Actual duration calculated from the delay time for each image. If isBrowserDuration is false, you should use this value.
* **durationIE** (int) - Duration for Internet Explorer (16fps)
* **durationSafari** (int) - Duration for Safari in milliseconds (16fps)
* **durationFirefox** (int) - Duration for Firefox in milliseconds (50fps)
* **durationChrome** (int) - Duration for Chrome in milliseconds (50fps)
* **durationOpera** (int) - Duration for Opera in milliseconds (50fps)

## image Properties
* **top** (int) - Image top position (Y).
* **left** (int) - Image left position (X).
* **height** (int) - Image height.
* **width** (int) - Image width.
* **localPalette** (bool) - Image has a local color palette.
* **localPaletteSize** (int) - Size of the local color palette.
* **interlace** (bool) - Image is/is not interlaced.
* **delay** (int) - Delay time in milliseconds.
* **disposal** (int) - Disposal method. (0-7). See [this](http://www.w3.org/Graphics/GIF/spec-gif89a.txt) for more details.

### Example
``` json
{
  "valid": true,
  "globalPalette": true,
  "globalPaletteSize": 256,
  "loopCount": 0,
  "height": 1610,
  "width": 899,
  "animated": true,
  "images": [
    {
      "localPalette": false,
      "localPaletteSize": 0,
      "interlace": false,
      "left": 0,
      "top": 0,
      "width": 1610,
      "height": 899,
      "delay": 350,
      "disposal": 0
    },
    {
      "localPalette": true,
      "localPaletteSize": 256,
      "interlace": false,
      "left": 0,
      "top": 0,
      "width": 1610,
      "height": 899,
      "delay": 350,
      "disposal": 0
    },
    {
      "localPalette": true,
      "localPaletteSize": 256,
      "interlace": false,
      "left": 0,
      "top": 0,
      "width": 1610,
      "height": 899,
      "delay": 350,
      "disposal": 0
    }
  ],
  "isBrowserDuration": false,
  "duration": 2800,
  "durationIE": 2800,
  "durationSafari": 2800,
  "durationFirefox": 2800,
  "durationChrome": 2800,
  "durationOpera": 2800
}
```

## Resources
* [What's In A GIF - Bit by Byte](http://www.matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp) - Hands down the best write up on GIFs I've found.
* [GIF98](http://www.w3.org/Graphics/GIF/spec-gif89a.txt) - GIF98 RFC.
* [Animated GIF Frame Rate by Browser](http://nullsleep.tumblr.com/post/16524517190/animated-gif-minimum-frame-delay-browser-compatibility) - An awesome breakdown of how each browser renders animated GIFs. Thanks to Jeremiah Johnson for doing the hard work.
* [GIF Format](http://www.onicos.com/staff/iz/formats/gif.html) - GIF blocks.
* [Hexfiend](http://ridiculousfish.com/hexfiend/) - Awesome open source HEX editor (OSX)

## License
Licence: [MIT](LICENSE)