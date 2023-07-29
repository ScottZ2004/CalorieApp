export function formatDateToCustomString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    // Custom format: DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function formatTimeToCustomString(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Custom format: HH:mm:ss
    const formattedDate = `${hours}:${minutes}:${seconds}`;
    return formattedDate;
}