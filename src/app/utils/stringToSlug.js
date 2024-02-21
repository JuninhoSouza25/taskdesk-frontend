export function stringToSlug(str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[^\w\s-]/g, ''); 
    str = str.replace(/\s+/g, '-');
    str = str.replace(/--+/g, '-');
    return str;
  }