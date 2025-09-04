import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function CustomerLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: 24, minHeight: "60vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
