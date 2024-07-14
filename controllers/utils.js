function generateUniqueNumber(dateString) {
    // Convert the date to a timestamp in milliseconds
    const date = new Date(dateString);
    const timestamp = date.getTime();
    
    // Generate a random number to add extra uniqueness
    const randomPart = Math.floor(Math.random() * 1000000);
    
    // Combine the timestamp and the random part
    const uniqueNumber = `${timestamp}${randomPart}`;
    
    return uniqueNumber;
}


module.exports = {
    generateUniqueNumber
}