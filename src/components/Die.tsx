type die = {
  die: {
    value: number;
    isHeld: boolean;
    id: string;
  };
  holdDice: () => void;
};

export default function Die(props: die) {
  const styles = {
    backgroundColor: props.die.isHeld ? "#59E391" : "",
  };

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <h2 className="die-number">{props.die.value}</h2>
    </div>
  );
}
