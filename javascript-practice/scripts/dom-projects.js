  function subscribed(){
        const Subscribed = document.querySelector(".js-subscribe-button");
        
        if (Subscribed.innerText === 'Subscribe'){
          Subscribed.classList.add("js-subscribed");
          Subscribed.innerText = 'Subscribed';
        } else {
          Subscribed.classList.remove("js-subscribed");
          Subscribed.innerHTML = 'Subscribe';    
        }

      }