import React, { Component } from 'react'

class CanvasComponent extends Component {
  componentDidMount = () => {
    this.ctx = this.refs.canvas.getContext('2d')
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
    this.refs.canvas.width = this.w
    this.refs.canvas.height = this.h
    this.nodes = []

    if (this.ctx) return this.draw()
  }

  draw = () => {
    requestAnimationFrame(this.draw);

    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.fillStyle = "rgba(0, 0, 0, .08)";
    this.ctx.fillRect(0, 0, this.w, this.h);

    this.ctx.globalCompositeOperation = "lighter";

    var l = this.nodes.length, node;
    while(l--) {
      node = this.nodes[l];
      this.drawNode(node);
      if (node.dead) {
        this.nodes.splice(l, 1);
      }
    }

    if (this.nodes.length < 10) {
      l = this.rand(4, 1) | 0;
      while(l--) {
        this.nodes.push(this.makeNode(
          Math.random() * this.w | 0,
          Math.random() * this.h | 0,
          40,
          "hsl(" + (this.rand(300, 0) | 0) + ", 100%, 50%)",
          100
        ));
      }
    }
  }

  drawNode(node) {
    var l = node.children.length
      , point
      ;
    while(l--) {
      point = node.children[l];
      this.ctx.beginPath();
      this.ctx.fillStyle = point.color;
      this.ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
      this.updatePoint(point);
      if (point.dead) {
        node.children.splice(l, 1);
        if (node.count > 20) {
          this.nodes.push(this.makeNode(
              point.x,
              point.y,
              node.radius * 10,
              node.color,
              (node.count / 10) | 0
          ))
        }
      }
    }
    if (!node.children.length) {
      node.dead = true;
    }
  }

  updatePoint(point) {
    var dx = point.x - point.dx;
    var dy = point.y - point.dy;
    var c = Math.sqrt(dx * dx + dy * dy);
    point.dead = c < 1;
    point.x -= dx * point.velocity;
    point.y -= dy * point.velocity;
  }

  rand(max, min) {
    min = min || 0;
    return Math.random() * (max - min) + min;
  }

  makeNode(x, y, radius, color, partCount) {

    const rad = Math.PI / 180;
    var ttt = 0;

    radius = radius || 0;
    partCount = partCount || 0;
    var count = partCount;

    var children = []
      , kof
      , r
      ;


    while(partCount--) {
      kof = 100 * Math.random() | 0;
      r = radius * Math.random() | 0;
      children.push({
        x: x,
        y: y,
        dx: x + r * Math.cos(ttt * kof * rad),
        dy: y + r * Math.sin(ttt * kof * rad),
        color: color,
        velocity: this.rand(1, 0.05)
      });
      ttt++
    }

    return {
  	  radius: radius,
      count: count,
      color: color,
      x: x,
      y: y,
      children: children
    }
  }

  render(){
    return (
      <div>
        <canvas ref='canvas' />
      </div>
    )
  }
}

export default CanvasComponent
