import React from 'react';

const Coins = (props) => {
  return (
    <div>
      <div>Coins: {props.coins.length}</div>
      {
        Object.keys(props.coins).map(key => <p key={key}><a href={"#" + props.coins[key]['coinId']}>{props.coins[key]['coinId']}</a></p>)
      }
    </div>
  );
}

export default Coins;