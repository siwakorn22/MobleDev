import React, { Component } from 'react' //สร้าง component จาก react

export default class Post extends Component {
  render() {
    return (
      <div>
        <p>
            <b>Text:</b> {this.props.content} 
            </p>
        <p>
            <b> Post by </b> : <i> {this.props.name} </i> 
            </p>
        </div>
    );
  }
}
