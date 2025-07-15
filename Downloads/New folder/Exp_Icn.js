export function getDLExpirationDate(issueDate, yearsValid) {

    const validity= yearsValid || 6; // Default to 4 years if not specified
    const date = new Date(issueDate);
    date.setFullYear(date.getFullYear() + validity);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}${month}${year}`; // Format: DDMMYYYY
  }
  
export function generateIcn() {
    
}