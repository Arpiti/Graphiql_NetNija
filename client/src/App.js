import BookList from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import AddBook from "./components/AddBook";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql",
cache: new InMemoryCache() })

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>Arpit's Reading List</h1>
      <BookList />
      <AddBook />
    </div>
    </ApolloProvider>
  );
}

export default App;
