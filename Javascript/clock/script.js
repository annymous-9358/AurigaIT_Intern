function updateClock() {
      const now = new Date();

      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      
      const secondDeg = seconds * 6;
      const minuteDeg = minutes * 6 + seconds * 0.1; 
      const hourDeg = ((hours % 12) * 30) + (minutes / 60) * 30;

      document.getElementById('second-container').style.transform = `rotate(${secondDeg}deg)`;
      document.getElementById('minute-container').style.transform = `rotate(${minuteDeg}deg)`;
      document.getElementById('hour-container').style.transform = `rotate(${hourDeg}deg)`;
    }

    setInterval(updateClock, 1000);
    updateClock();