const Players = require('../models/users');
const Goals = require('../models/goals');

exports.sortObjectEntries = (obj) => {
  return Object.entries(obj).sort((a,b) => b[1]-a[1])
      }

      