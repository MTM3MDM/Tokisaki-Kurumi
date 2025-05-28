import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import TranslatorPage from "@/pages/translator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TranslatorPage} />
      <Route path="/translator" component={TranslatorPage} />
      <Route component={() => <div>404 - Page not found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
