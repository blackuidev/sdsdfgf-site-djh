import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/NotFound";
import ProductListing from "./pages/Shoes/ProductListingPage";
import ProductDetailPage from "./pages/Shoes/ProductDetailPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ProductDetails from './components/ProductDetails';


const queryClient = new QueryClient();

// =======================================================
// ✅ Wrapper that hides Header on specific routes
// =======================================================
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {/* {!shouldHideHeader && <Header />} */}
            {children}
        </>
    );
};
// =======================================================

const App = () => (
    <div className="font-primarylw">
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<ProductListing />} />
                        <Route path="/products/:productId" element={<ProductDetailPage />} />
                        <Route path="/product-details/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </QueryClientProvider>
    </div >
);

export default App;