const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null
    this.selector = selector
    this.targetDate = targetDate
  }

  countTimer() {
    const startTime = this.targetDate

    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const countTime = startTime - currentTime
      const time = this.getTimeComponents(countTime)
      updateClockface(time)

      if (countTime <= 0) {
        clearInterval(this.intervalId)
        const time = this.getTimeComponents(0)
        updateClockface(time)
      }
    })

    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const countTime = startTime - currentTime
      const time = this.getTimeComponents(countTime)
      updateClockface(time)

      if (countTime <= 0) {
        clearInterval(this.intervalId)
        const time = this.getTimeComponents(0)
        updateClockface(time)
      }
    }, 1000)
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)))
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    )
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)))
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000))

    return { days, hours, mins, secs }
  }

  pad(value) {
    return String(value).padStart(2, '0')
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022'),
})

timer.countTimer()

function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = days
  refs.hours.textContent = hours
  refs.mins.textContent = mins
  refs.secs.textContent = secs
  return `${days}:${hours}:${mins}:${secs}`
}
