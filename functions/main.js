exports.sortObjectEntries = (obj) => {
  return Object.entries(obj).sort((a,b) => b[1]-a[1])
      }