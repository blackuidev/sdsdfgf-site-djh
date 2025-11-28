import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/NotFound";
import ProductListing from "./pages/Shoes/ProductListingPage";
import ProductDetailPage from "./pages/Shoes/ProductDetailPage";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import ProductDetails from './components/ProductDetails';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';


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
                <Header />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductListing />} />
                        <Route path="/products/:productId" element={<ProductDetailPage />} />
                        <Route path="/product-details/:productId" element={<ProductDetails />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
                <Footer />
            </BrowserRouter>
        </QueryClientProvider>
    </div >
);

export default App;