class KeyPressedTracker {
  keyStatus = {
    up: false,
    down: false,
    left: false,
    right: false,
    pick: false,
  };
  keyDownListener = function(e) {
    let key = e.keyCode;
    switch (key) {
      case 87:
      case 38:
        keyPress.keyStatus.up = true;
        break;
      case 83:
      case 40:
        keyPress.keyStatus.down = true;
        break;
      case 65:
      case 37:
        keyPress.keyStatus.left = true;
        break;
      case 68:
      case 39:
        keyPress.keyStatus.right = true;
        break;
      case 32:
        keyPress.keyStatus.fire = true;
    }
  };
  keyUpListener = function(e) {
    let key = e.keyCode;
    switch (key) {
      case 87:
      case 38:
        keyPress.keyStatus.up = false;
        break;
      case 83:
      case 40:
        keyPress.keyStatus.down = false;
        break;
      case 65:
      case 37:
        keyPress.keyStatus.left = false;
        break;
      case 68:
      case 39:
        keyPress.keyStatus.right = false;
        break;
      case 32:
        keyPress.keyStatus.fire = false;
        break;
    }
  };
}

let keyPress = new KeyPressedTracker();