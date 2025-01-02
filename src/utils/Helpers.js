
//========================= HELPER FUNCTIONS USED IN APP

export function formatAndElapsedTime(dateInput) { //FOR FORMATTING DATES TO REASONABLE FORMAT 
    // Parse the input date
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      return "Invalid date!";
    }
  

    // Format the date as DD/MM/YYY
    const mins = String(date.getMinutes()).padStart(2, '0');
    const hr = String(date.getHours()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year} ${hr}:${mins}${hr >= 12 ?  'PM' : 'AM'}`;
  
    // Calculate elapsed time
    const now = new Date();
    const elapsedTime = now - date;
    
  
    // Convert elapsed time into human-readable format
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    
  
    let elapsedTimeString = "";
    if (years > 0) {
      elapsedTimeString = `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      elapsedTimeString = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      elapsedTimeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      elapsedTimeString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      elapsedTimeString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  
    return { formattedDate, elapsedTimeString };
}


export const throttle =(func, delay)=>{ //throttle FUNCTION TO HELP BUTTONS
  let inThrottle;
    
  return function (...arg) {
    if(!inThrottle){
      func.apply(this, arg)
      inThrottle = true;
      setTimeout(()=>{
        inThrottle = false
      }, delay);
    }
  }

}

///this function breaks given number down to thousand million and billion
export const handleBalancePadding = (number) =>{
  const  value = Number(number);

  if ((value / 1e9) >= 1){

    let temp =  value / 1e9
    return `${temp.toFixed(3)}B`
  }
  else if ((value / 1e6) >= 1){

    let temp =  value / 1e6
    return `${temp.toFixed(3)}M`
  }
  else if ((value / 1e3) >= 100){

    let temp =  value / 1e3
    return `${temp.toFixed(3)}K`
  }

  return value
}