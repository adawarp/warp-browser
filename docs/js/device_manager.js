/* global AnalogPad: false */
/* eslint-disable no-unused-vars */

let ledButtons = {},
  lastSelectedButtonIndex,
  servoYawSlider, servoRightSlider, servoLeftSlider,
  servoView = {}, callback;

function initDeviceManager(_callback) {
  if (_callback && typeof _callback === 'function') {
    callback = _callback;
  }
  ledButtons['on'] = document.getElementById('on_btn');
  ledButtons['off'] = document.getElementById('off_btn');
  ledButtons['blink'] = document.getElementById('blink_btn');

  servoYawSlider = document.getElementById('yaw_slider');
  servoRightSlider = document.getElementById('right_slider');
  servoLeftSlider = document.getElementById('left_slider');

  servoView['yaw'] = document.getElementById('yaw');
  servoView['right'] = document.getElementById('right');
  servoView['left'] = document.getElementById('left');

  for (let key in ledButtons) {
    ((index) => {
      ledButtons[index].onclick = () => {
        changeLedStatus(index);
      };
    })(key);
  }

  const analogPad = new AnalogPad(document.querySelector('#controller'));
  analogPad.subscribe(function(e) {
    if (callback) {
      callback({
        type: 'servos',
        angles: [parseInt(e.x), parseInt(e.y)]
      });
    }
  });

  servoYawSlider.oninput = handleSliderChanged;
  servoRightSlider.oninput = handleSliderChanged;
  servoLeftSlider.oninput = handleSliderChanged;
  changeLedStatus('on');

}

function changeLedStatus(status) {
  if (callback) {
    callback({type: 'LED', status: status});
  }
  changeButtonColor(status);
}

function changeButtonColor(index) {
  if (lastSelectedButtonIndex === index) {
    return;
  }

  if (ledButtons.hasOwnProperty(lastSelectedButtonIndex)) {
    ledButtons[lastSelectedButtonIndex].classList.remove('pressed');
    ledButtons[lastSelectedButtonIndex].classList.add('released');
  }
  ledButtons[index].classList.remove('released');
  ledButtons[index].classList.add('pressed');
  lastSelectedButtonIndex = index;
}

function handleSliderChanged(event) {
  let angle = event.target.value;
  let servo = event.target.dataset.servo;
  servoView[servo].value = angle;
  if (callback) {
    callback({type: 'servo', servo: servo, angle: angle});
  }
}
