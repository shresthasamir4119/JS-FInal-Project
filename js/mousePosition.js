class Mouse {
  mouse = {
    x: 0,
    y: 0
  };




  handleMouse = (event) => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

  }
  getMousePosition = () => {

    return this.mouse;
  }
}



let mouse = new Mouse();
window.onmousemove = mouse.handleMouse;