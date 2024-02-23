// Styles for floating logs from the library
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ cssAnimationStyle: 'from-top', fontAwesomeIconStyle: 'shadow' });

// Object of references
const refs = {
  form: document.querySelector('.form'),
  firstDelay:document.querySelector('input[name = "delay"]'),
  step:document.querySelector('input[name = "step"]'),
  amount:document.querySelector('input[name = "amount"]'),
};

// Form submission listener
refs.form.addEventListener('submit', onFormSubmit);

// Form submission function
function onFormSubmit(evt) {

// Preventing default browser behavior
  evt.preventDefault();

// Field values
  const firstDelay = Number(refs.firstDelay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

// How many times to execute the promise
  for (let i = 1; i <= amount; i += 1) {
    const delayStep = firstDelay + step * (i - 1);
    createPromise(i, delayStep).then(onSuccess).catch(onError)
  };
};

// Creating a promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
};

function onSuccess({ position, delay }) { 
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
