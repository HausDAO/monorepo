import { useConnect } from '@daohaus/connect-context';

function App() {
  const { connectWallet, disconnect, profile } = useConnect();

  return (
    <div>
      <h1>{profile.displayName}</h1>
      <div>
        {profile.daos?.map((dao) => (
          <p>{dao.name}</p>
        ))}
      </div>
      <button onClick={connectWallet}>Connect</button>;
      <button onClick={disconnect}>disonnect</button>;
    </div>
  );
}

export default App;
