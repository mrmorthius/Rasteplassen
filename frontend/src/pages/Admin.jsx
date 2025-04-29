function Admin({ token, logout }) {
  console.log(token);
  return (
    <>
      <div>Admin</div>
      <button onClick={() => logout()}>Logout</button>
      <h1>Vite + React</h1>
      <h1 className="text-3xl font-bold underline text-yellow-500">
        Hello world! EirikTest12345
      </h1>
    </>
  );
}

export default Admin;
