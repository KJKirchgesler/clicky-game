import React from "react";
import "./LeaderCard.css";

const LeaderCard = props => (
  <div 
    className="card" 
    value={props.id} 
    onClick={() => props.clickImage(props.id)}
  >
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default LeaderCard;