const PLAYER_SIZE = 50;
const GUN_MIN_DISTANCE = 20;
const ENEMY_MIN_DISTANCE = 20;
const ITEM_MIN_DISTANCE = 200;
const BULLET_DISTANCE = 5; //distance per time
const BULLET_SIZE = 5;
const MIN_ZONE_RADIUS = 200;
const MAX_LEFT = canvas.width/2-150-25;//max left distance
const MAX_RIGHT = -(50*30)+canvas.width/2+25+150;//max right distance
const MAX_UP = canvas.height/2-150-25;//max top
const MAX_DOWN = -(50*30)+canvas.height/2+25+150;//max bottom
let playerInRange = true;
let mouseClicked = false;
let currentTime;
let ctx = document.getElementById('canvas').getContext('2d');
let targetDiv = document.querySelector('.main-wrapper');




