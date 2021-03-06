var listify = function(objects, options){

  var list = {
    objects: objects,
    options: {
      idKey: options.idKey,
      nameKey: options.nameKey,
      listClass: options.listClass,
      itemClass: options.itemClass,
      href: options.href
    }
  }

  return list;
}

module.exports = listify;
