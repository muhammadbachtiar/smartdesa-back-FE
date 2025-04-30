import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Routers from "./services/routes";
import LoadingComponent from "./components/loadingComponent";
import { useSelector } from "react-redux";
import { StateContext } from "./types/app.type";
import '../src/services/styles/style.css'

const queryClient = new QueryClient();

export default function App() {
  const isLoading = useSelector((state : StateContext) => state.app.isLoading)
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <LoadingComponent loading={isLoading}/>
        <Routers/>
      </UserProvider>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
