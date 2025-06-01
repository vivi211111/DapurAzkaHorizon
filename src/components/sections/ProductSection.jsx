import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const productsData = [
  // Middle Category
  { id: 'maksubah-middle', name: 'Maksubah Middle', description: 'Kue Maksubah kualitas middle, rasa klasik.', price: 325000, image: 'maksubah-middle', category: 'Middle' },
  { id: 'maksubah-prunes-middle', name: 'Maksubah Prunes Middle', description: 'Maksubah middle dengan tambahan buah prunes.', price: 375000, image: 'maksubah-prunes-middle', category: 'Middle' },
  { id: 'maksubah-keju-middle', name: 'Maksubah Keju Middle', description: 'Maksubah middle dengan cita rasa keju.', price: 355000, image: 'maksubah-keju-middle', category: 'Middle' },
  { id: 'maksubah-coklat-middle', name: 'Maksubah Coklat Middle', description: 'Maksubah middle dengan sentuhan coklat.', price: 355000, image: 'maksubah-coklat-middle', category: 'Middle' },
  { id: 'lapan-jam-middle', name: 'Lapan Jam Middle', description: 'Kue Lapan Jam kualitas middle.', price: 325000, image: 'lapan-jam-middle', category: 'Middle' },
  { id: 'lapan-jam-duren-middle', name: 'Lapan Jam Duren Middle', description: 'Lapan Jam middle dengan aroma durian.', price: 365000, image: 'lapan-jam-duren-middle', category: 'Middle' },
  { id: 'lapan-jam-keju-middle', name: 'Lapan Jam Keju Middle', description: 'Lapan Jam middle dengan rasa keju.', price: 355000, image: 'lapan-jam-keju-middle', category: 'Middle' },
  { id: 'lapis-kojo-middle', name: 'Lapis Kojo Middle', description: 'Kue Lapis Kojo kualitas middle.', price: 325000, image: 'lapis-kojo-middle', category: 'Middle' },
  { id: 'lapis-kojo-duren-middle', name: 'Lapis Kojo Duren Middle', description: 'Lapis Kojo middle dengan aroma durian.', price: 365000, image: 'lapis-kojo-duren-middle', category: 'Middle' },
  { id: 'engkak-middle', name: 'Engkak Middle', description: 'Kue Engkak kualitas middle.', price: 325000, image: 'engkak-middle', category: 'Middle' },
  { id: 'engkak-duren-middle', name: 'Engkak Duren Middle', description: 'Engkak middle dengan aroma durian.', price: 365000, image: 'engkak-duren-middle', category: 'Middle' },
  { id: 'maksubah-kojo-makjo-middle', name: 'Maksubah Kojo (Makjo) Middle', description: 'Perpaduan Maksubah dan Kojo middle.', price: 325000, image: 'maksubah-kojo-makjo-middle', category: 'Middle' },
  { id: 'maksubah-kojo-makjo-prunes-middle', name: 'Maksubah Kojo (Makjo) Prunes Middle', description: 'Makjo middle dengan buah prunes.', price: 375000, image: 'maksubah-kojo-makjo-prunes-middle', category: 'Middle' },
  { id: 'maksubah-engkak-kojo-makengko-middle', name: 'Maksubah Engkak Kojo (MakEngKo) Middle', description: 'Kombinasi Maksubah, Engkak, Kojo middle.', price: 325000, image: 'maksubah-engkak-kojo-makengko-middle', category: 'Middle' },

  // Premium Category
  { id: 'maksubah-premium', name: 'Maksubah Premium', description: 'Kue Maksubah kualitas premium, rasa istimewa.', price: 435000, image: 'maksubah-premium', category: 'Premium' },
  { id: 'maksubah-prunes-premium', name: 'Maksubah Prunes Premium', description: 'Maksubah premium dengan buah prunes pilihan.', price: 485000, image: 'maksubah-prunes-premium', category: 'Premium' },
  { id: 'maksubah-keju-premium', name: 'Maksubah Keju Premium', description: 'Maksubah premium dengan keju berkualitas.', price: 465000, image: 'maksubah-keju-premium', category: 'Premium' },
  { id: 'maksubah-coklat-premium', name: 'Maksubah Coklat Premium', description: 'Maksubah premium dengan coklat premium.', price: 475000, image: 'maksubah-coklat-premium', category: 'Premium' },
  { id: 'lapan-jam-premium', name: 'Lapan Jam Premium', description: 'Kue Lapan Jam kualitas premium.', price: 435000, image: 'lapan-jam-premium', category: 'Premium' },
  { id: 'lapan-jam-duren-premium', name: 'Lapan Jam Duren Premium', description: 'Lapan Jam premium dengan durian pilihan.', price: 475000, image: 'lapan-jam-duren-premium', category: 'Premium' },
  { id: 'lapan-jam-keju-premium', name: 'Lapan Jam Keju Premium', description: 'Lapan Jam premium dengan keju istimewa.', price: 465000, image: 'lapan-jam-keju-premium', category: 'Premium' },
  { id: 'lapis-kojo-premium', name: 'Lapis Kojo Premium', description: 'Kue Lapis Kojo kualitas premium.', price: 435000, image: 'lapis-kojo-premium', category: 'Premium' },
  { id: 'lapis-kojo-duren-premium', name: 'Lapis Kojo Duren Premium', description: 'Lapis Kojo premium dengan durian pilihan.', price: 475000, image: 'lapis-kojo-duren-premium', category: 'Premium' },
  { id: 'engkak-premium', name: 'Engkak Premium', description: 'Kue Engkak kualitas premium.', price: 435000, image: 'engkak-premium', category: 'Premium' },
  { id: 'engkak-duren-premium', name: 'Engkak Duren Premium', description: 'Engkak premium dengan durian pilihan.', price: 475000, image: 'engkak-duren-premium', category: 'Premium' },
  { id: 'maksubah-kojo-makjo-premium', name: 'Maksubah Kojo (Makjo) Premium', description: 'Perpaduan Maksubah dan Kojo premium.', price: 435000, image: 'maksubah-kojo-makjo-premium', category: 'Premium' },
  { id: 'maksubah-kojo-makjo-prunes-premium', name: 'Maksubah Kojo (Makjo) Prunes Premium', description: 'Makjo premium dengan buah prunes pilihan.', price: 485000, image: 'maksubah-kojo-makjo-prunes-premium', category: 'Premium' },
  { id: 'maksubah-engkak-kojo-makengko-premium', name: 'Maksubah Engkak Kojo (MakEngKo) Premium', description: 'Kombinasi Maksubah, Engkak, Kojo premium.', price: 435000, image: 'maksubah-engkak-kojo-makengko-premium', category: 'Premium' },
  { id: 'lapis-legit-original-premium', name: 'Lapis Legit Original Premium', description: 'Lapis Legit Original kualitas premium.', price: 435000, image: 'lapis-legit-original-premium', category: 'Premium' },
  { id: 'lapis-legit-nanas-premium', name: 'Lapis Legit Nanas Premium', description: 'Lapis Legit premium dengan selai nanas.', price: 475000, image: 'lapis-legit-nanas-premium', category: 'Premium' },
  { id: 'lapis-legit-keju-premium', name: 'Lapis Legit Keju Premium', description: 'Lapis Legit premium dengan taburan keju.', price: 475000, image: 'lapis-legit-keju-premium', category: 'Premium' },
  { id: 'lapis-legit-coklat-premium', name: 'Lapis Legit Coklat Premium', description: 'Lapis Legit premium dengan lapisan coklat.', price: 475000, image: 'lapis-legit-coklat-premium', category: 'Premium' },
  { id: 'lapis-legit-prunes-premium', name: 'Lapis Legit Prunes Premium', description: 'Lapis Legit premium dengan buah prunes.', price: 485000, image: 'lapis-legit-prunes-premium', category: 'Premium' },
];


const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: `${product.name} ditambahkan!`,
      description: `${quantity} ${product.name} telah ditambahkan ke keranjang.`,
      duration: 3000,
    });
    setQuantity(1);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between group"
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-200 overflow-hidden relative">
          <img  alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">Lihat Detail</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#4A2C1A] mb-1 h-12 overflow-hidden">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">{product.description}</p>
          <p className="text-lg font-bold text-orange-600">Rp {product.price.toLocaleString('id-ID')}</p>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-2">
            <Minus size={16} />
          </Button>
          <span className="text-md font-medium w-8 text-center">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-2">
            <Plus size={16} />
          </Button>
        </div>
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} className="mr-2" /> Tambah
        </Button>
      </div>
    </motion.div>
  );
};


const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const categories = ['Semua Menu', 'Middle', 'Premium'];
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  const filteredProducts = activeCategory === 'Semua Menu'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section id="menu" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-4">Menu Kue Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilihan kue lapis tradisional Palembang dengan kualitas Middle dan Premium.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-2 md:space-x-4 mb-10 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={`mb-2 md:mb-0 ${activeCategory === category ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-500 border-orange-500 hover:bg-orange-50'}`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {currentProducts.map((product, index) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                <ProductCard product={product} />
                </motion.div>
            ))}
            </div>
        ) : (
            <p className="text-center text-gray-600">Tidak ada produk dalam kategori ini.</p>
        )}


        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50 disabled:opacity-50"
            >
              Sebelumnya
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                variant={currentPage === number ? 'default' : 'outline'}
                className={`${currentPage === number ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-500 border-orange-500 hover:bg-orange-50'}`}
              >
                {number}
              </Button>
            ))}
            <Button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50 disabled:opacity-50"
            >
              Berikutnya
            </Button>
          </div>
        )}
         <p className="text-center text-sm text-gray-500 mt-4">
          Halaman {currentPage} dari {totalPages} ({filteredProducts.length} menu)
        </p>
      </div>
    </section>
  );
};

export default ProductSection;