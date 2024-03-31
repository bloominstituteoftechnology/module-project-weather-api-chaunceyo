

async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
 document.querySelector('#weatherWidget').style.display = 'none' //Task 1
 document.querySelector('#citySelect').addEventListener('change', async evt =>{ //Task 2
 try{
      evt.target.setAttribute('disabled' , 'disabled')
      document.querySelector('#weatherWidget').style.display = 'none'
      document.querySelector('.info').textContent = `Fetching weather data...` //Task 3
      const weather = `http://localhost:3003/api/weather?city=${evt.target.value}`
      const res =  await axios.get(weather)
      
        document.querySelector('.info').textContent = ''
        evt.target.removeAttribute('disabled')
        document.querySelector('#weatherWidget').style.display = 'block'

        let {data} = res 
        console.log(data)
        document.querySelector('#apparentTemp div:nth-child(2)')
            .textContent =`${data.current.apparent_temperature}°`
        document.querySelector('#todayDescription')
            .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
        document.querySelector('#todayStats div:nth-child(1)')
            .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
        document.querySelector('#todayStats div:nth-child(2)')
            .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
        document.querySelector('#todayStats div:nth-child(3)')
            .textContent = `Humidity: ${data.current.humidity}%` 
        document.querySelector('#todayStats div:nth-child(4)')
            .textContent = `Wind: ${data.current.wind_speed}m/s`

        data.forecast.daily.forEach((day, i) => {
          let card = document.querySelectorAll('.next-day')[i]
          
          let weekDay = card.children[0]
          let apparent = card.children[1]
          let minMax = card.children[2]
          let precipit = card.children[3]
          
          weekDay.textContent = getWeekDay(day.date)
          apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
          minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`
          precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
        })
        document.querySelector('#location div:nth-child(1)')
            .textContent = evt.target.value
 }catch(err) {
 console.log('Error occurred: ' + err)
 }
  })
  
  function getWeekDay(date){
    let newDate = new Date(date);
    let dayOfWeek = newDate.getDay() + 1
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return weekdays[dayOfWeek]
  }
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
