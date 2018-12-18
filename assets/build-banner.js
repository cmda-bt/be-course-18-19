'use strict';

var e = 1e2;

var config = {
  text: 'be()',
  title: 'Backend',
  fontSize: 120,
  width: 1200,
  height: 800,
  particlesPerShape: 20,
  opacitySpeed: 20,
  opacityFrames: 3,
  rotateRadius: 150,
  rotateSpeed: 80,
  foreground: '#47ff47',
  background: 'black'
};

var shapes = {
  t1: 'M7.76,10.89c-1.5,2.18-2.77,4.5-4.27,6.68-1.12,1.63-2.22,4-.86,5.41a4.34,4.34,0,0,0,2.25,1,130.06,130.06,0,0,0,24.85,3.36,2.65,2.65,0,0,0,2-.45,2.5,2.5,0,0,0,.51-2c-.43-7.43-5.32-13.76-10-19.55C21.15,4,20,2.67,18.4,2.18a5.71,5.71,0,0,0-5,1.19,16.87,16.87,0,0,0-3.43,4c-1.43,2.11-.79,1.36-2.23,3.47',
  c1: 'M12.36,11.18a1.16,1.16,0,0,0-1.63-.11,3,3,0,0,0-.87,1.58c-.61,2.11-.78,4.58.55,6.32,1.71,2.23,5.36,2.21,7.57.46s3.15-4.69,3.26-7.5a13.18,13.18,0,0,0-1.89-7.67A9.12,9.12,0,0,0,12.85,0,9.93,9.93,0,0,0,4.51,3.82,20.08,20.08,0,0,0,.67,12.45c-.86,3.8-1.14,8,.63,11.44,2.31,4.55,7.64,6.85,12.72,7.3a13.12,13.12,0,0,0,7.81-1.32,15.12,15.12,0,0,0,5-5.68c2.11-3.59,3.87-7.56,3.88-11.73S28.64,3.9,24.84,2.21',
  l1: 'M2.07,10.63a6,6,0,0,0,2.89,6A6,6,0,0,0,11.59,16c3.64-3.14,2.84-10.08,7.21-12.06,2.83-1.29,6.15.49,8.31,2.72s3.86,5,6.55,6.59a9.31,9.31,0,0,0,10.47-1A9.31,9.31,0,0,0,46.62,2',
  t2: 'M23.42,19c-1.93-6-2.36-7.18-4.09-13.2-.54-1.88-1.82-4.21-3.71-3.74a3.78,3.78,0,0,0-1.45.88,120.75,120.75,0,0,0-9.68,9.15c-1.38,1.45-2.82,3.27-2.41,5.23a6.22,6.22,0,0,0,2.63,3.34,73,73,0,0,0,15.38,9.16c2,.87,4.64,1.5,6-.18s.26-4-1-5.75S24.06,21,23.42,19Z',
  c2: 'M13.44,10.08a2.92,2.92,0,0,0-4.15-.66C7.93,10.56,8,12.75,8.79,14.32a6.86,6.86,0,0,0,8.38,3,7.23,7.23,0,0,0,4.17-8A11.85,11.85,0,0,0,18.15,4,11.42,11.42,0,0,0,12.33.14a9.79,9.79,0,0,0-7.4,2C1.72,4.41-.71,8.37.19,12.21a13.84,13.84,0,0,0,1.85,4,30.12,30.12,0,0,0,5,6.55A11.53,11.53,0,0,0,14.33,26,12.35,12.35,0,0,0,22,23.15c4.33-3.33,7.31-9,5.86-14.3',
  l2: 'M85.7,8.9c.33-3.32-2.7-6.31-6-6.81s-6.62,1-9.21,3.12S65.89,10,63.64,12.49a9.41,9.41,0,0,1-4.58,3.19c-3.47.78-6.65-2.08-8.76-4.94s-4.2-6.21-7.64-7.11c-3.79-1-7.67,1.51-10.15,4.54s-4.16,6.7-6.93,9.47S18.31,22.12,15,20.06a12.07,12.07,0,0,1-3.69-4.46L7.93,9.85A7.14,7.14,0,0,0,5.39,6.91C4.22,6.3,2.5,6.56,2,7.78',
  t3: 'M16.58,2.36A68.52,68.52,0,0,0,5.33,2.14,4.14,4.14,0,0,0,2.7,3C1.38,4.23,2.18,6.42,3,8l8.1,14.87c.65,1.2,1.43,2.5,2.75,2.87a4.89,4.89,0,0,0,3.37-.69A42.36,42.36,0,0,0,32.45,12.46a8.56,8.56,0,0,0,1.79-3.54,3.37,3.37,0,0,0-1.38-3.5A5,5,0,0,0,31,4.92C25.13,4.1,22.51,2.9,16.58,2.36Z',
  c3: 'M16.66,19.31c0-2.1-2.84-3.38-4.68-2.35s-2.46,3.52-1.85,5.54c1.12,3.7,5.8,5.64,9.41,4.27s5.81-5.44,5.52-9.3a12.82,12.82,0,0,0-6-9.46A12.7,12.7,0,0,0,8,6.38,12.65,12.65,0,0,0,.54,15.12a20.73,20.73,0,0,0,.75,11.75,17.2,17.2,0,0,0,2.43,4.92c3.94,5.26,11.55,6.36,18,5a17.51,17.51,0,0,0,7.55-3.24,15.27,15.27,0,0,0,4.9-8.16A20.76,20.76,0,0,0,18.61,0',
  l3: 'M2,19.86c2.37-3.51,2.92-9.08,7-10,2.51-.58,5,1.1,6.65,3.1s2.78,4.4,4.69,6.14a10.34,10.34,0,0,0,13.12.34c3.4-2.8,4.55-7.42,6.65-11.29S46.72.68,50.74,2.48c5.2,2.33,4.63,11.25,9.95,13.29a8.22,8.22,0,0,0,6.09-.56,18.15,18.15,0,0,0,9.57-9.86'
};

var doc = [
  '<svg',
  '  xmlns="http://www.w3.org/2000/svg"',
  '  xmlns:xlink="http://www.w3.org/1999/xlink"',
  '  viewBox="' + [0, 0, config.width, config.height].join(' ') + '"',
  '>',
  '  <title>' + config.title + '</title>',
  '  <style>',
  '    :root { color: ' + config.background + '; background-color: currentcolor; max-width: 100% }',
  '    body { margin: 0 }',
  '    path { fill: none; stroke: ' + config.foreground + '; stroke-width: 5px; stroke-linecap: round; stroke-opacity: 0.05 }',
  '    path:nth-child(odd) { stroke-opacity: 0.075 }',
  '  </style>',
  '  <rect width="100%" height="100%" fill="currentcolor"/>',
  '  <defs>',
  Object.keys(shapes).map(function (name, index, all) {
    var radius = config.rotateRadius;
    var values = [];
    var length = all.length;
    var offset = -1;
    var hardMax = index + config.opacityFrames;
    var softMax = hardMax % length;

    while (++offset < length) {
      if (
        (offset >= index && offset < hardMax) ||
        (hardMax > length && offset < softMax)
      ) {
        values[offset] = 1;
      } else {
        values[offset] = 0;
      }
    }

    /* Otherwise we have a hard break. */
    if (values[length - 1] && !values[0]) values[0] = 1;
    if (values[0] && !values[length - 1]) values[length - 1] = 1;

    return [
      '  <path id="' + name + '" d="' + shapes[name] + '">',
      '    <animate',
      '      attributeName="opacity"',
      '      repeatCount="indefinite"',
      '      dur="' + config.opacitySpeed + 's"',
      '      values="' + values.join(';') + '"',
      '    />',
      '    <animateTransform',
      '      attributeName="transform"',
      '      type="rotate"',
      '      repeatCount="indefinite"',
      '      dur="' + config.rotateSpeed + 's"',
      '      from="' + [360, radius, radius].join(' ') + '"',
      '      to="' + [0, radius, radius].join(' ') + '"',
      '    />',
      '  </path>'
    ].join('\n')
  }).join('\n'),
  '  </defs>',
  Object.keys(shapes).map(function (name) {
    var result = [];
    var index = -1;
    var length = config.particlesPerShape;

    while (++index < length) {
      result[index] = [
        '  <use',
        '    xlink:href="#' + name + '"',
        '    transform="' + [
          'translate(' + r(config.width) + ' ' + r(config.height) + ')',
          'rotate(' + r(360) + ')',
          'scale(' + r(0.8, 1.2) + ')'
        ].join(' ') + '"',
        '  />',
      ].join('\n');
    }

    return result.join('\n');
  }).join('\n'),
  '  <text',
  '    x="' + (config.width / 2) + '"',
  '    y="' + (config.height / 2) + '"',
  '    font-family="courier new, courier, monospace"',
  '    font-weight="bold"',
  '    font-size="' + config.fontSize + '"',
  '    fill="' + config.foreground + '"',
  '    text-anchor="middle"',
  '    alignment-baseline="middle"',
  '  >' + config.text + '</text>',
  '</svg>'
].join('\n');

/* Print to stdout. */
console.log(doc);

function r(x, y) {
  var min = arguments.length === 2 ? x : y || 0;
  var max = arguments.length === 2 ? y : x || 1;
  return Math.floor(lerp(min, max, Math.random()) * e) / e;
}

function lerp(x, y, weight) {
  return x * (1 - weight) + y * weight;
}
