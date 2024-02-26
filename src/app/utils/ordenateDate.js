export function ordenateDate(array) {
    array.sort(function(a, b) {
        var dataA = new Date(a.updatedAt);
        var dataB = new Date(b.updatedAt);
        return dataB - dataA;
    });
    return array;
}