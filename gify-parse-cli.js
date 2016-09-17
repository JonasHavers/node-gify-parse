#!/usr/bin/env node
/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function () {
    var fs = require('fs');
    var path = require('path');
    var program = require('commander');
    var gifyParse = require('./gify-parse');
    var version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'UTF-8')).version;
    program
        .version(version)
        .usage('<file> [option]')
        .option('-p, --property', 'get a specific property from the information object (use the dot-notation to step into)')
        .parse(process.argv);
    var argv = process.argv.slice(2);
    if (argv.length === 0) {
        program.help();
    }
    var fileName = String(argv[0]);
    if (fileName.charAt(0) === '-') {
        console.error('Provide a file as first argument.');
        program.help();
    }
    function handlePropertyArgument(argv, info) {
        function getPropertyKey(argv) {
            var argKey;
            for (argKey in argv) {
                if (argv.hasOwnProperty(argKey)) {
                    var argValue = String(argv[argKey]);
                    if (argValue === '-p' || argValue === '--property') {
                        if ((+argKey + 1) == argv.length) {
                            // No property key is provided, print the usage
                            console.error('Provide a property key.');
                            program.help();
                        }
                        return String(argv[++argKey]);
                    }
                }
            }
        }
        function getPropertyValue(info, propKey) {
            var propValue;
            if (propKey.indexOf('.') === -1) {
                propValue = info[propKey];
            } else {
                // Go into depth...
                propValue = info;
                propKey.split('.').forEach(function (e, i) {
                    if (propValue.hasOwnProperty(e)) {
                        propValue = propValue[e];
                    }
                });
            }
            return propValue;
        }
        var propKey = getPropertyKey(argv);
        var propValue = getPropertyValue(info, propKey);
        console.log(propValue);
    }
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.error('Error reading file: %s\n(%s)', fileName, err);
            process.exit(1);
        }
        var info = gifyParse.getInfo(data);
        if (program.property) {
            // Option '-p' or '--property' is available
            handlePropertyArgument(argv, info);
        } else {
            console.log(info);
        }
    });
})();