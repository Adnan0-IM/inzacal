import { useAddress } from "@/hooks/use-address";
const Address = () => {
  const { address, loading, error } = useAddress();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!address) return <div>No address found</div>;

  return (

    //Model to  Display address fields and or select address/city
    <div>
      {Object.entries(address).map((value) => (
        <div key={value[0]}>{value[1]}</div>
      ))}
    </div>
  );
};

export default Address;
