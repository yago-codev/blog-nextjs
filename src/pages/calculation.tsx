export default function Calculation() {
  const handleSum = async () => {
    const { sum } = (await import('../libs/calc')).default;
    alert(sum(3, 5));
  };

  return (
    <div>
      <h1>Cálculo</h1>
      <button onClick={handleSum}>Somar</button>
    </div>
  );
}
