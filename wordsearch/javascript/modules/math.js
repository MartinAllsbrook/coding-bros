function getRandomInt(max, min){
    // ensures that the min and max are whole numbers

    lower_bound = Math.floor(min)
    max_bound = Math.ceil(max)

    return Math.floor((Math.random() * (max_bound - lower_bound)) + lower_bound)
}