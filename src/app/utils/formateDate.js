export function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()+ 1).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    const fomatedData = `${dia}-${mes}-${ano}`;
    return fomatedData;
}