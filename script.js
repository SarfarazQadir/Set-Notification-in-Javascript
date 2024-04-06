function setNotifications() {
    for(let i = 1; i <= 5; i++) {
      let timeInput = document.getElementById('notifyTime' + i);
      let time = timeInput.value;
      let [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
      let now = new Date();
      let notifyTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

      if(notifyTime > now) { // Set notification only if the time is in the future
        let timeout = notifyTime.getTime() - now.getTime();
        setTimeout(() => {
          showNotification('Notification ' + i + ' - Time to do something!');
        }, timeout);
      }
    }
  }

  function showNotification(message) {
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        } else {
          // Fallback to using SweetAlert if permission is denied
          swal(message);
        }
      });
    } else {
      // Fallback to using SweetAlert if permission is denied
      swal(message);
    }
  }