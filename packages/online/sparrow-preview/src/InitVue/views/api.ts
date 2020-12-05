
export default {
  '/src/views/api.js': 
    {
      code: decodeURIComponent(`import%20request%20from%20%22%40%2Futils%2Frequest%22%3B%0Aexport%20function%20getList(params)%20%7B%0A%20%20return%20request(%7B%0A%20%20%20%20url%3A%20%22%2Fapi%2FgetList%22%2C%0A%20%20%20%20method%3A%20%22get%22%2C%0A%20%20%20%20params%0A%20%20%7D)%3B%0A%7D%0A%0Aexport%20function%20save(data)%20%7B%0A%20%20return%20request(%7B%0A%20%20%20%20url%3A%20%22%2Fapi%2Fsave%22%2C%0A%20%20%20%20method%3A%20%22post%22%2C%0A%20%20%20%20data%0A%20%20%7D)%3B%0A%7D%0A`)
    }    
  
}