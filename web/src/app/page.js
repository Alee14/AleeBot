export default function Home() {

  return (
      <main className="flex flex-col space-y-5 justify-center items-center h-screen">
          <h1 className="text-4xl font-medium">AleeBot</h1>
          <form className="flex flex-col gap-4 w-80">
              <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
              />
              <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
              />
              <input
                  name="apiUrl"
                  type="url"
                  placeholder="API URL"
                  required
              />
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >Login
              </button>
        </form>
      </main>
  );
}
