import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus, ShoppingCart, Star, Heart, Share2, Clock, Flame, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const productsData = [
  // Middle Category
  { id: 'maksubah-middle', name: 'Maksubah Middle', description: 'Kue Maksubah kualitas middle, rasa klasik.', price: 325000, image: 'maksubah-middle', category: 'Middle', rating: 4.7, reviews: 25, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Middle"], ingredients: ["Telur", "Gula", "Santan", "Tepung Terigu"] },
  { id: 'maksubah-prunes-middle', name: 'Maksubah Prunes Middle', description: 'Maksubah middle dengan tambahan buah prunes.', price: 375000, image: 'maksubah-prunes-middle', category: 'Middle', rating: 4.8, reviews: 15, prepTime: "N/A", spiceLevel: "N/A", tags: ["Prunes", "Middle"], ingredients: ["Telur", "Gula", "Santan", "Tepung Terigu", "Prunes"] },
  { id: 'maksubah-keju-middle', name: 'Maksubah Keju Middle', description: 'Maksubah middle dengan cita rasa keju.', price: 355000, image: 'maksubah-keju-middle', category: 'Middle', rating: 4.6, reviews: 20, prepTime: "N/A", spiceLevel: "N/A", tags: ["Keju", "Middle"], ingredients: ["Telur", "Gula", "Santan", "Tepung Terigu", "Keju"] },
  { id: 'maksubah-coklat-middle', name: 'Maksubah Coklat Middle', description: 'Maksubah middle dengan sentuhan coklat.', price: 355000, image: 'maksubah-coklat-middle', category: 'Middle', rating: 4.7, reviews: 18, prepTime: "N/A", spiceLevel: "N/A", tags: ["Coklat", "Middle"], ingredients: ["Telur", "Gula", "Santan", "Tepung Terigu", "Coklat Bubuk"] },
  { id: 'lapan-jam-middle', name: 'Lapan Jam Middle', description: 'Kue Lapan Jam kualitas middle.', price: 325000, image: 'lapan-jam-middle', category: 'Middle', rating: 4.5, reviews: 22, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Middle"], ingredients: ["Telur", "Gula Merah", "Santan", "Tepung Terigu"] },
  { id: 'lapan-jam-duren-middle', name: 'Lapan Jam Duren Middle', description: 'Lapan Jam middle dengan aroma durian.', price: 365000, image: 'lapan-jam-duren-middle', category: 'Middle', rating: 4.9, reviews: 30, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Middle", "Favorit"], ingredients: ["Telur", "Gula Merah", "Santan", "Tepung Terigu", "Daging Durian"] },
  { id: 'lapan-jam-keju-middle', name: 'Lapan Jam Keju Middle', description: 'Lapan Jam middle dengan rasa keju.', price: 355000, image: 'lapan-jam-keju-middle', category: 'Middle', rating: 4.6, reviews: 17, prepTime: "N/A", spiceLevel: "N/A", tags: ["Keju", "Middle"], ingredients: ["Telur", "Gula Merah", "Santan", "Tepung Terigu", "Keju"] },
  { id: 'lapis-kojo-middle', name: 'Lapis Kojo Middle', description: 'Kue Lapis Kojo kualitas middle.', price: 325000, image: 'lapis-kojo-middle', category: 'Middle', rating: 4.7, reviews: 28, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Middle"], ingredients: ["Telur", "Gula Pasir", "Santan", "Daun Pandan", "Tepung Terigu"] },
  { id: 'lapis-kojo-duren-middle', name: 'Lapis Kojo Duren Middle', description: 'Lapis Kojo middle dengan aroma durian.', price: 365000, image: 'lapis-kojo-duren-middle', category: 'Middle', rating: 4.8, reviews: 26, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Middle"], ingredients: ["Telur", "Gula Pasir", "Santan", "Daun Pandan", "Tepung Terigu", "Daging Durian"] },
  { id: 'engkak-middle', name: 'Engkak Middle', description: 'Kue Engkak kualitas middle.', price: 325000, image: 'engkak-middle', category: 'Middle', rating: 4.5, reviews: 19, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Middle"], ingredients: ["Tepung Ketan", "Santan", "Gula Pasir", "Telur"] },
  { id: 'engkak-duren-middle', name: 'Engkak Duren Middle', description: 'Engkak middle dengan aroma durian.', price: 365000, image: 'engkak-duren-middle', category: 'Middle', rating: 4.9, reviews: 23, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Middle", "Best Seller"], ingredients: ["Tepung Ketan", "Santan", "Gula Pasir", "Telur", "Daging Durian"] },
  { id: 'maksubah-kojo-makjo-middle', name: 'Maksubah Kojo (Makjo) Middle', description: 'Perpaduan Maksubah dan Kojo middle.', price: 325000, image: 'maksubah-kojo-makjo-middle', category: 'Middle', rating: 4.6, reviews: 16, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi", "Middle"], ingredients: ["Bahan Maksubah", "Bahan Lapis Kojo"] },
  { id: 'maksubah-kojo-makjo-prunes-middle', name: 'Maksubah Kojo (Makjo) Prunes Middle', description: 'Makjo middle dengan buah prunes.', price: 375000, image: 'maksubah-kojo-makjo-prunes-middle', category: 'Middle', rating: 4.7, reviews: 12, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi", "Prunes", "Middle"], ingredients: ["Bahan Maksubah", "Bahan Lapis Kojo", "Prunes"] },
  { id: 'maksubah-engkak-kojo-makengko-middle', name: 'Maksubah Engkak Kojo (MakEngKo) Middle', description: 'Kombinasi Maksubah, Engkak, Kojo middle.', price: 325000, image: 'maksubah-engkak-kojo-makengko-middle', category: 'Middle', rating: 4.8, reviews: 21, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi Lengkap", "Middle"], ingredients: ["Bahan Maksubah", "Bahan Engkak", "Bahan Lapis Kojo"] },

  // Premium Category
  { id: 'maksubah-premium', name: 'Maksubah Premium', description: 'Kue Maksubah kualitas premium, rasa istimewa.', price: 435000, image: 'maksubah-premium', category: 'Premium', rating: 4.9, reviews: 50, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Premium", "Best Seller"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental", "Tepung Terigu Protein Rendah", "Mentega Wijsman"] },
  { id: 'maksubah-prunes-premium', name: 'Maksubah Prunes Premium', description: 'Maksubah premium dengan buah prunes pilihan.', price: 485000, image: 'maksubah-prunes-premium', category: 'Premium', rating: 5.0, reviews: 35, prepTime: "N/A", spiceLevel: "N/A", tags: ["Prunes", "Premium", "Mewah"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Buah Prunes California"] },
  { id: 'maksubah-keju-premium', name: 'Maksubah Keju Premium', description: 'Maksubah premium dengan keju berkualitas.', price: 465000, image: 'maksubah-keju-premium', category: 'Premium', rating: 4.8, reviews: 40, prepTime: "N/A", spiceLevel: "N/A", tags: ["Keju", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Keju Edam/Cheddar Premium"] },
  { id: 'maksubah-coklat-premium', name: 'Maksubah Coklat Premium', description: 'Maksubah premium dengan coklat premium.', price: 475000, image: 'maksubah-coklat-premium', category: 'Premium', rating: 4.9, reviews: 38, prepTime: "N/A", spiceLevel: "N/A", tags: ["Coklat", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Coklat Couverture"] },
  { id: 'lapan-jam-premium', name: 'Lapan Jam Premium', description: 'Kue Lapan Jam kualitas premium.', price: 435000, image: 'lapan-jam-premium', category: 'Premium', rating: 4.7, reviews: 45, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Aren Asli", "Santan Kental Segar", "Tepung Terigu Protein Rendah", "Mentega Wijsman"] },
  { id: 'lapan-jam-duren-premium', name: 'Lapan Jam Duren Premium', description: 'Lapan Jam premium dengan durian pilihan.', price: 475000, image: 'lapan-jam-duren-premium', category: 'Premium', rating: 5.0, reviews: 55, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Premium", "Favorit"], ingredients: ["Telur Bebek Pilihan", "Gula Aren Asli", "Santan Kental Segar", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Daging Durian Monthong Pilihan"] },
  { id: 'lapan-jam-keju-premium', name: 'Lapan Jam Keju Premium', description: 'Lapan Jam premium dengan keju istimewa.', price: 465000, image: 'lapan-jam-keju-premium', category: 'Premium', rating: 4.8, reviews: 33, prepTime: "N/A", spiceLevel: "N/A", tags: ["Keju", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Aren Asli", "Santan Kental Segar", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Keju Edam/Cheddar Premium"] },
  { id: 'lapis-kojo-premium', name: 'Lapis Kojo Premium', description: 'Kue Lapis Kojo kualitas premium.', price: 435000, image: 'lapis-kojo-premium', category: 'Premium', rating: 4.9, reviews: 48, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental Segar", "Ekstrak Daun Pandan Asli", "Tepung Terigu Protein Rendah", "Mentega Wijsman"] },
  { id: 'lapis-kojo-duren-premium', name: 'Lapis Kojo Duren Premium', description: 'Lapis Kojo premium dengan durian pilihan.', price: 475000, image: 'lapis-kojo-duren-premium', category: 'Premium', rating: 4.9, reviews: 42, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Premium"], ingredients: ["Telur Bebek Pilihan", "Gula Pasir Halus", "Santan Kental Segar", "Ekstrak Daun Pandan Asli", "Tepung Terigu Protein Rendah", "Mentega Wijsman", "Daging Durian Monthong Pilihan"] },
  { id: 'engkak-premium', name: 'Engkak Premium', description: 'Kue Engkak kualitas premium.', price: 435000, image: 'engkak-premium', category: 'Premium', rating: 4.7, reviews: 39, prepTime: "N/A", spiceLevel: "N/A", tags: ["Tradisional", "Premium"], ingredients: ["Tepung Ketan Pilihan", "Santan Kental Segar", "Gula Pasir Halus", "Telur Bebek Pilihan", "Mentega Wijsman"] },
  { id: 'engkak-duren-premium', name: 'Engkak Duren Premium', description: 'Engkak premium dengan durian pilihan.', price: 475000, image: 'engkak-duren-premium', category: 'Premium', rating: 5.0, reviews: 44, prepTime: "N/A", spiceLevel: "N/A", tags: ["Durian", "Premium", "Best Seller"], ingredients: ["Tepung Ketan Pilihan", "Santan Kental Segar", "Gula Pasir Halus", "Telur Bebek Pilihan", "Mentega Wijsman", "Daging Durian Monthong Pilihan"] },
  { id: 'maksubah-kojo-makjo-premium', name: 'Maksubah Kojo (Makjo) Premium', description: 'Perpaduan Maksubah dan Kojo premium.', price: 435000, image: 'maksubah-kojo-makjo-premium', category: 'Premium', rating: 4.8, reviews: 36, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi", "Premium"], ingredients: ["Bahan Maksubah Premium", "Bahan Lapis Kojo Premium"] },
  { id: 'maksubah-kojo-makjo-prunes-premium', name: 'Maksubah Kojo (Makjo) Prunes Premium', description: 'Makjo premium dengan buah prunes pilihan.', price: 485000, image: 'maksubah-kojo-makjo-prunes-premium', category: 'Premium', rating: 4.9, reviews: 29, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi", "Prunes", "Premium", "Mewah"], ingredients: ["Bahan Maksubah Premium", "Bahan Lapis Kojo Premium", "Buah Prunes California"] },
  { id: 'maksubah-engkak-kojo-makengko-premium', name: 'Maksubah Engkak Kojo (MakEngKo) Premium', description: 'Kombinasi Maksubah, Engkak, Kojo premium.', price: 435000, image: 'maksubah-engkak-kojo-makengko-premium', category: 'Premium', rating: 4.9, reviews: 41, prepTime: "N/A", spiceLevel: "N/A", tags: ["Kombinasi Lengkap", "Premium"], ingredients: ["Bahan Maksubah Premium", "Bahan Engkak Premium", "Bahan Lapis Kojo Premium"] },
  { id: 'lapis-legit-original-premium', name: 'Lapis Legit Original Premium', description: 'Lapis Legit Original kualitas premium.', price: 435000, image: 'lapis-legit-original-premium', category: 'Premium', rating: 5.0, reviews: 60, prepTime: "N/A", spiceLevel: "N/A", tags: ["Legit", "Premium", "Best Seller"], ingredients: ["Kuning Telur Omega", "Mentega Wijsman", "Gula Halus", "Susu Bubuk Full Cream", "Rempah Spekuk Pilihan"] },
  { id: 'lapis-legit-nanas-premium', name: 'Lapis Legit Nanas Premium', description: 'Lapis Legit premium dengan selai nanas homemade.', price: 475000, image: 'lapis-legit-nanas-premium', category: 'Premium', rating: 4.8, reviews: 32, prepTime: "N/A", spiceLevel: "N/A", tags: ["Legit", "Nanas", "Premium"], ingredients: ["Kuning Telur Omega", "Mentega Wijsman", "Gula Halus", "Susu Bubuk Full Cream", "Rempah Spekuk Pilihan", "Selai Nanas Homemade"] },
  { id: 'lapis-legit-keju-premium', name: 'Lapis Legit Keju Premium', description: 'Lapis Legit premium dengan taburan keju cheddar Australia.', price: 475000, image: 'lapis-legit-keju-premium', category: 'Premium', rating: 4.9, reviews: 43, prepTime: "N/A", spiceLevel: "N/A", tags: ["Legit", "Keju", "Premium"], ingredients: ["Kuning Telur Omega", "Mentega Wijsman", "Gula Halus", "Susu Bubuk Full Cream", "Rempah Spekuk Pilihan", "Keju Cheddar Australia"] },
  { id: 'lapis-legit-coklat-premium', name: 'Lapis Legit Coklat Premium', description: 'Lapis Legit premium dengan lapisan coklat couverture.', price: 475000, image: 'lapis-legit-coklat-premium', category: 'Premium', rating: 4.9, reviews: 37, prepTime: "N/A", spiceLevel: "N/A", tags: ["Legit", "Coklat", "Premium"], ingredients: ["Kuning Telur Omega", "Mentega Wijsman", "Gula Halus", "Susu Bubuk Full Cream", "Rempah Spekuk Pilihan", "Coklat Couverture"] },
  { id: 'lapis-legit-prunes-premium', name: 'Lapis Legit Prunes Premium', description: 'Lapis Legit premium dengan buah prunes California.', price: 485000, image: 'lapis-legit-prunes-premium', category: 'Premium', rating: 5.0, reviews: 46, prepTime: "N/A", spiceLevel: "N/A", tags: ["Legit", "Prunes", "Premium", "Mewah"], ingredients: ["Kuning Telur Omega", "Mentega Wijsman", "Gula Halus", "Susu Bubuk Full Cream", "Rempah Spekuk Pilihan", "Buah Prunes California"] },
];

const customerReviewsData = [
    { id: 1, user: "Budi Santoso", avatar: "Budi Santoso Avatar", rating: 5, comment: "Maksubah Premiumnya luar biasa! Teksturnya lembut, manisnya pas. Sangat direkomendasikan!", date: "2025-05-22", photos: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200"], productId: "maksubah-premium" },
    { id: 2, user: "Siti Rahayu", avatar: "Siti Rahayu Avatar", rating: 4, comment: "Lapis Legit Originalnya enak, wangi rempahnya terasa. Cocok buat teman minum teh.", date: "2025-05-20", photos: [], productId: "lapis-legit-original-premium" },
    { id: 3, user: "Ahmad Rizki", avatar: "Ahmad Rizki Avatar", rating: 5, comment: "Engkak Duren Middle nya mantap! Aroma duriannya kuat, rasanya legit. Bikin nagih!", date: "2025-05-18", photos: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200"], productId: "engkak-duren-middle" },
    { id: 4, user: "Dewi Lestari", avatar: "Dewi Lestari Avatar", rating: 4, comment: "Lapan Jam Keju Premiumnya unik, perpaduan manis gurihnya pas. Kemasannya juga cantik.", date: "2025-05-24", photos: [], productId: "lapan-jam-keju-premium" },
    { id: 5, user: "Rian Ardianto", avatar: "Rian Ardianto Avatar", rating: 5, comment: "Semua kue di sini enak-enak! Kualitas premiumnya benar-benar terasa beda. Pelayanan juga ramah.", date: "2025-05-15", photos: [], productId: "maksubah-prunes-premium" },
];


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProductReviews, setAllProductReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [reviewSortOrder, setReviewSortOrder] = useState('rating-tinggi');
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 3;
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoModalImage, setCurrentPhotoModalImage] = useState('');

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      const productSpecificReviews = customerReviewsData.filter(r => r.productId === foundProduct.id);
      setAllProductReviews(productSpecificReviews);
    }
  }, [id]);

  useEffect(() => {
    let sortedReviews = [...allProductReviews];
    if (reviewSortOrder === 'rating-tinggi') {
      sortedReviews.sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
    } else if (reviewSortOrder === 'rating-rendah') {
      sortedReviews.sort((a, b) => a.rating - b.rating || new Date(b.date) - new Date(a.date));
    } else if (reviewSortOrder === 'terbaru') {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    const startIndex = (reviewPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setDisplayedReviews(sortedReviews.slice(startIndex, endIndex));
  }, [allProductReviews, reviewSortOrder, reviewPage]);


  if (!product) {
    return <Layout><div className="text-center py-10">Produk tidak ditemukan. <Link to="/" className="text-orange-500 hover:underline">Kembali ke Beranda</Link></div></Layout>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
     toast({
      title: `${product.name} ditambahkan!`,
      description: `${quantity} ${product.name} telah ditambahkan ke keranjang.`,
      duration: 3000,
    });
  };
  
  const averageRating = product.rating;
  const totalReviews = allProductReviews.length > 0 ? allProductReviews.length : product.reviews; 

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allProductReviews.forEach(r => ratingDistribution[r.rating]++);
  if (allProductReviews.length === 0 && totalReviews > 0) { 
    ratingDistribution[5] = Math.floor(totalReviews * (product.rating >= 4.5 ? 0.7 : 0.5));
    ratingDistribution[4] = Math.floor(totalReviews * 0.2);
    ratingDistribution[3] = Math.floor(totalReviews * 0.05);
    ratingDistribution[2] = Math.floor(totalReviews * 0.03);
    ratingDistribution[1] = Math.max(0, totalReviews - ratingDistribution[5] - ratingDistribution[4] - ratingDistribution[3] - ratingDistribution[2]);
  }
  
  const totalReviewPages = Math.ceil(allProductReviews.length / reviewsPerPage);

  const handleReviewPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalReviewPages) {
      setReviewPage(newPage);
    }
  };

  const openPhotoModal = (photoUrl) => {
    setCurrentPhotoModalImage(photoUrl);
    setIsPhotoModalOpen(true);
  };
  
  const canUserReview = () => {
    if (!isAuthenticated) return false;
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    return userOrders.some(order => 
        order.status === 'Selesai' && 
        order.items.some(item => item.id === product.id)
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image and Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative mb-4">
              <img  alt={product.name} className="w-full h-auto max-h-[400px] object-contain rounded-md" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white"><Heart className="h-5 w-5 text-red-500" /></Button>
                <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white"><Share2 className="h-5 w-5 text-gray-600" /></Button>
              </div>
            </div>
            <div className="flex space-x-2 mb-4">
              {product.tags && product.tags.map(tag => (
                <span key={tag} className={`px-3 py-1 text-xs font-semibold rounded-full ${tag.toLowerCase().includes("premium") ? "bg-yellow-100 text-yellow-700" : tag.toLowerCase().includes("middle") ? "bg-blue-100 text-blue-700" : tag.toLowerCase().includes("best seller") || tag.toLowerCase().includes("favorit") ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center"><Clock size={16} className="mr-1 text-orange-500" /> Waktu Pembuatan: {product.prepTime}</div>
                <div className="flex items-center"><Flame size={16} className="mr-1 text-red-500" /> Kategori: {product.category}</div>
            </div>
          </div>

          {/* Product Details and Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-[#4A2C1A] mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                <Star className="text-yellow-400 fill-yellow-400 mr-1" size={20}/>
                <span className="text-lg font-semibold text-gray-700">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-2">({totalReviews} reviews)</span>
                </div>
                <p className="text-2xl font-bold text-orange-600 mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-medium">Jumlah:</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={18} />
                </Button>
                <span className="text-xl font-semibold w-10 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={18} />
                </Button>
                </div>
            </div>

            <div>
                <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg mb-4"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={20} className="mr-2" /> Tambah ke Keranjang
                </Button>
                <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Detail Produk</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    Kue {product.name} ini adalah salah satu andalan Dapur Azka Qanita, dibuat dengan resep turun temurun dan bahan berkualitas tinggi. Cocok untuk hantaran, acara keluarga, atau dinikmati sendiri.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Bahan Utama</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    {product.ingredients.join(", ")}. Kami hanya menggunakan bahan-bahan segar dan berkualitas.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-gray-700 hover:text-orange-500">Catatan Pemesanan</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                    Untuk pemesanan dalam jumlah besar atau permintaan khusus, silakan hubungi kami melalui kontak yang tersedia.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
          </div>
        </div>
        
        {/* Customer Reviews Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Ulasan Pelanggan</h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Overall Rating */}
            <div className="md:w-1/3">
              <div className="text-center mb-4">
                <p className="text-5xl font-bold text-orange-600">{averageRating.toFixed(1)}</p>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={`mr-1 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">{totalReviews} total ulasan terverifikasi</p>
              </div>
              {/* Rating Breakdown */}
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center">
                    <span className="text-sm text-gray-600 w-6">{star}</span>
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mx-1" />
                    <div className="flex-grow bg-gray-200 rounded-full h-2 mx-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${totalReviews > 0 ? (ratingDistribution[star] / totalReviews) * 100 : 0}%`}}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">({ratingDistribution[star]})</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Media</p>
                <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mb-2 text-gray-700 hover:bg-gray-50">Lihat Foto Pembeli</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-0">
                        <DialogHeader className="p-4 border-b">
                            <DialogTitle>Foto dari Pembeli</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                            {currentPhotoModalImage ? (
                                <img  alt="Review media" className="w-full h-auto rounded-md object-contain max-h-[70vh]" src="https://images.unsplash.com/photo-1632998772668-afc7ae2bc054" />
                            ) : (
                                <p className="text-center text-gray-500 py-8">Tidak ada foto untuk ditampilkan.</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full text-gray-700 hover:bg-gray-50" onClick={() => toast({title: "Fitur Segera Hadir", description: "Video pembeli akan segera tersedia."})}>Lihat Video Pembeli</Button>
              </div>
              {canUserReview() && (
                <Button onClick={() => navigate(`/reviews#give-review&productId=${product.id}`)} className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                    Beri Ulasan untuk Produk Ini
                </Button>
              )}
            </div>
            
            {/* Individual Reviews */}
            <div className="md:w-2/3">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold text-[#4A2C1A]">Ulasan Pilihan ({allProductReviews.length})</p>
                    <select value={reviewSortOrder} onChange={(e) => setReviewSortOrder(e.target.value)} className="text-sm border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-500">
                        <option value="rating-tinggi">Rating tertinggi</option>
                        <option value="rating-rendah">Rating terendah</option>
                        <option value="terbaru">Terbaru</option>
                    </select>
                </div>
              {displayedReviews.length > 0 ? displayedReviews.map(review => (
                <div key={review.id} className="border-b border-gray-200 py-4 last:border-b-0">
                  <div className="flex items-start mb-2">
                     <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0">
                        <img  alt={review.user} className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{review.user}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={`mr-1 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                         <span className="text-xs text-gray-500 ml-2">{new Date(review.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex space-x-2">
                      {review.photos.map((photoUrl, index) => (
                        <button key={index} onClick={() => openPhotoModal(photoUrl)} className="w-16 h-16 bg-gray-200 rounded overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-orange-500">
                            <img  alt={`Review photo ${index+1} by ${review.user}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1575909759564-3933d67be523" />
                        </button>
                      ))}
                    </div>
                  )}
                   <p className="text-xs text-orange-500 mt-2 cursor-pointer hover:underline">Membantu...</p>
                </div>
              )) : <p className="text-gray-500 text-center py-4">Belum ada ulasan untuk produk ini.</p>}
              {/* Pagination for reviews */}
              {totalReviewPages > 1 && (
                <div className="flex justify-center items-center space-x-1 mt-6">
                    <Button variant="outline" size="icon" onClick={() => handleReviewPageChange(reviewPage - 1)} disabled={reviewPage === 1} className="h-8 w-8"> <ChevronLeft size={16}/> </Button>
                    {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map(page => (
                        <Button key={page} variant={reviewPage === page ? "default" : "outline"} size="icon" onClick={() => handleReviewPageChange(page)} className="h-8 w-8">
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" size="icon" onClick={() => handleReviewPageChange(reviewPage + 1)} disabled={reviewPage === totalReviewPages} className="h-8 w-8"> <ChevronRight size={16}/> </Button>
                </div>
              )}
              {allProductReviews.length > 0 && <p className="text-center text-xs text-gray-500 mt-2">Halaman {reviewPage} dari {totalReviewPages} ({allProductReviews.length} ulasan)</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;