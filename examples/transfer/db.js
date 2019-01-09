'use strict';

exports.ERR_ALREADY_EXISTS = 0x01;
exports.all = all;
exports.has = has;
exports.get = get;
exports.remove = remove;
exports.removed = removed;
exports.set = set;
exports.add = add;

var byId = {
  'evil-dead': {
    id: 'evil-dead',
    title: 'Evil Dead',
    plot: 'Five friends travel to a cabin in the woods, where they unknowingly release flesh-possessing demons.',
    description: 'Five friends head to a remote cabin, where the discovery of a Book of the Dead leads them to unwittingly summon up demons living in the nearby woods. The evil presence possesses them until only one is left to fight for survival.'
  },
  'the-shawshank-redemption': {
    id: 'the-shawshank-redemption',
    title: 'The Shawshank Redemption',
    plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    description: 'Andy Dufresne is a young and successful banker whose life changes drastically when he is convicted and sentenced to life imprisonment for the murder of his wife and her lover. Set in the 1940’s, the film shows how Andy, with the help of his friend Red, the prison entrepreneur, turns out to be a most unconventional prisoner.'
  },
  'the-godfather': {
    id: 'the-godfather',
    title: 'The Godfather',
    plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    description: 'The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter’s wedding with his wife Carmela. His beloved son Michael has just come home from the war, but does not intend to become part of his father’s business. Through Michael’s life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family. Don Vito lives his life in the way of the old country, but times are changing and some don’t want to follow the old ways and look out for community and family. An up and coming rival of the Corleone family wants to start selling drugs in New York, and needs the Don’s influence to further his plan. The clash of the Don’s fading old world values and the new ways will demand a terrible price, especially from Michael, all for the sake of the family.'
  }
};

var byIndex = Object.keys(byId);

function all() {
  var result = [];
  var length = byIndex.length;
  var index = -1;
  var data;

  while (++index < length) {
    data = byId[byIndex[index]];

    if (data) {
      result.push(data);
    }
  }

  return result;
}

function has(id) {
  return byId[id] !== undefined;
}

function get(id) {
  return byId[id];
}

function remove(id) {
  byId[id] = undefined;
}

function removed(id) {
  return id in byId && byId[id] === undefined;
}

function set(data) {
  var id = data.id;

  byId[id] = data;

  if (byIndex.indexOf(id) === -1) {
    byIndex.push(id);
  }

  return data;
}

function add(data) {
  var id = data.id;
  var err;

  if (byId[id] !== undefined) {
    err = new Error('Cannot add already existing entity');
    err.code = exports.ERR_ALREADY_EXISTS;
    throw err;
  }

  byId[id] = data;

  if (byIndex.indexOf(id) === -1) {
    byIndex.push(id);
  }

  return data;
}
